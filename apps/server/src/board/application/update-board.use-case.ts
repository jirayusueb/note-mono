import type { Result } from "../../shared/infrastructure/utils";
import type { Board, IBoardRepository, UpdateBoardInput } from "../domain";

export class UpdateBoardUseCase {
	constructor(private readonly boardRepository: IBoardRepository) {}

	async execute(
		id: string,
		input: UpdateBoardInput,
	): Promise<Result<Board, Error>> {
		return await this.boardRepository.update(id, input);
	}
}
