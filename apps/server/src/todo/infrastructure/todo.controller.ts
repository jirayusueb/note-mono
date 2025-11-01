import { Elysia } from "elysia";

import TodoRepository from "./todo.repository";
import {
	createTodoSchema,
	todoParamsSchema,
	todoQuerySchema,
	updateTodoSchema,
} from "./todo.schema";
import { StatusCodes } from "../../shared/infrastructure/const";
import { Response } from "../../shared/infrastructure/utils";
import {
	CreateTodoUseCase,
	DeleteTodoUseCase,
	GetTodoUseCase,
	ListTodosUseCase,
	UpdateTodoUseCase,
} from "../application";

const todoController = new Elysia({ prefix: "/api/todos" })
	.post(
		"/",
		async ({ body, set }) => {
			const repository = new TodoRepository();
			const useCase = new CreateTodoUseCase(repository);

			const result = await useCase.execute({
				...body,
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
			body: createTodoSchema,
		},
	)
	.get(
		"/:id",
		async ({ params, set }) => {
			const repository = new TodoRepository();
			const useCase = new GetTodoUseCase(repository);

			const result = await useCase.execute(params.id);

			if (result.isErr()) {
				const errorResponse = Response.err(result.error);
				set.status = errorResponse.statusCode;

				return errorResponse.response;
			}

			if (!result.value) {
				const notFoundResponse = Response.notFound("Todo not found");
				set.status = notFoundResponse.statusCode;

				return notFoundResponse.response;
			}

			set.status = StatusCodes.OK;

			return Response.ok(result.value);
		},
		{
			params: todoParamsSchema,
		},
	)
	.get(
		"/",
		async ({ query, status, set }) => {
			const repository = new TodoRepository();
			const useCase = new ListTodosUseCase(repository);

			const result = await useCase.execute({
				userId: query.userId,
				completed: query.completed,
				page: query.page,
				limit: query.limit,
			});

			if (result.isErr()) {
				throw status(StatusCodes.INTERNAL_SERVER_ERROR);
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
			query: todoQuerySchema,
		},
	)
	.patch(
		"/:id",
		async ({ params, body, set }) => {
			const repository = new TodoRepository();
			const useCase = new UpdateTodoUseCase(repository);

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
			params: todoParamsSchema,
			body: updateTodoSchema,
		},
	)
	.delete(
		"/:id",
		async ({ params, set }) => {
			const repository = new TodoRepository();
			const useCase = new DeleteTodoUseCase(repository);

			const result = await useCase.execute(params.id);

			if (result.isErr()) {
				const errorResponse = Response.err(result.error);
				set.status = errorResponse.statusCode;

				return errorResponse.response;
			}

			set.status = StatusCodes.OK;

			return Response.ok({ message: "Todo deleted successfully" });
		},
		{
			params: todoParamsSchema,
		},
	);

export default todoController;
