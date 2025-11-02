import { Elysia } from "elysia";

import BoardRepository from "./board.repository";
import {
	boardParamsSchema,
	boardQuerySchema,
	createBoardSchema,
	updateBoardSchema,
} from "./board.schema";
import { StatusCodes } from "../../shared/infrastructure/const";
import { Response } from "../../shared/infrastructure/utils";
import { authMiddleware } from "../../shared/middleware";
import {
	CreateBoardUseCase,
	DeleteBoardUseCase,
	GetBoardUseCase,
	ListBoardsUseCase,
	UpdateBoardUseCase,
} from "../application";

const boardController = new Elysia({ prefix: "/api/boards" })
	.use(authMiddleware)
	.post(
		"/",
		async ({ body, set, user }) => {
			const repository = new BoardRepository();
			const useCase = new CreateBoardUseCase(repository);

			const result = await useCase.execute({
				...body,
				userId: user.id,
				description: body.description ?? null,
			});

			if (result.isErr()) {
				const errorResponse = Response.err(result.error);
				set.status = errorResponse.statusCode;

				return errorResponse.response;
			}

			set.status = StatusCodes.CREATED;

			return Response.ok(result.value);
		},
		{
			auth: true,
			body: createBoardSchema,
		},
	)
	.get(
		"/:id",
		async ({ params, set }) => {
			const repository = new BoardRepository();
			const useCase = new GetBoardUseCase(repository);

			const result = await useCase.execute(params.id);

			if (result.isErr()) {
				const errorResponse = Response.err(result.error);
				set.status = errorResponse.statusCode;

				return errorResponse.response;
			}

			if (!result.value) {
				const notFoundResponse = Response.notFound("Board not found");
				set.status = notFoundResponse.statusCode;

				return notFoundResponse.response;
			}

			set.status = StatusCodes.OK;

			return Response.ok(result.value);
		},
		{
			params: boardParamsSchema,
		},
	)
	.get(
		"/",
		async ({ query, set, user }) => {
			const repository = new BoardRepository();
			const useCase = new ListBoardsUseCase(repository);

			const result = await useCase.execute({
				userId: user.id,
				page: query.page,
				limit: query.limit,
			});

			if (result.isErr()) {
				const errorResponse = Response.err(result.error);
				set.status = errorResponse.statusCode;

				return errorResponse.response;
			}

			set.status = StatusCodes.OK;

			return Response.paginate({
				items: result.value.items,
				page: query.page,
				limit: query.limit,
				total: result.value.total,
			});
		},
		{
			auth: true,
			query: boardQuerySchema,
		},
	)
	.patch(
		"/:id",
		async ({ params, body, set }) => {
			const repository = new BoardRepository();
			const useCase = new UpdateBoardUseCase(repository);

			const result = await useCase.execute(params.id, body);

			if (result.isErr()) {
				const errorResponse = Response.err(result.error);
				set.status = errorResponse.statusCode;

				return errorResponse.response;
			}

			set.status = StatusCodes.OK;

			return Response.ok(result.value);
		},
		{
			params: boardParamsSchema,
			body: updateBoardSchema,
		},
	)
	.delete(
		"/:id",
		async ({ params, set }) => {
			const repository = new BoardRepository();
			const useCase = new DeleteBoardUseCase(repository);

			const result = await useCase.execute(params.id);

			if (result.isErr()) {
				const errorResponse = Response.err(result.error);
				set.status = errorResponse.statusCode;

				return errorResponse.response;
			}

			set.status = StatusCodes.OK;

			return Response.ok({ message: "Board deleted successfully" });
		},
		{
			params: boardParamsSchema,
		},
	);

export default boardController;
