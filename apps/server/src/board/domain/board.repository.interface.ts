import type { Board } from "./board.entity";
import type {
	BoardFilters,
	CreateBoardInput,
	UpdateBoardInput,
} from "./board.types";
import type { Result } from "../../shared/infrastructure/utils";

export interface IBoardRepository {
	create(input: CreateBoardInput): Promise<Result<Board, Error>>;
	findById(id: string): Promise<Result<Board | null, Error>>;
	findAll(filters?: BoardFilters): Promise<Result<Board[], Error>>;
	count(filters?: BoardFilters): Promise<Result<number, Error>>;
	update(id: string, input: UpdateBoardInput): Promise<Result<Board, Error>>;
	delete(id: string): Promise<Result<void, Error>>;
}
