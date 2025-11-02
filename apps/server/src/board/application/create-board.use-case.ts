import type { Result } from "../../shared/infrastructure/utils";
import type { Board, CreateBoardInput, IBoardRepository } from "../domain";

export class CreateBoardUseCase {
	constructor(private readonly boardRepository: IBoardRepository) {}

	async execute(input: CreateBoardInput): Promise<Result<Board, Error>> {
		return await this.boardRepository.create(input);
	}
}
