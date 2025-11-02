import type { Result } from "../../shared/infrastructure/utils";
import type { Board, IBoardRepository } from "../domain";

export class GetBoardUseCase {
	constructor(private readonly boardRepository: IBoardRepository) {}

	async execute(id: string): Promise<Result<Board | null, Error>> {
		return await this.boardRepository.findById(id);
	}
}
