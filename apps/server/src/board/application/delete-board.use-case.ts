import type { Result } from "../../shared/infrastructure/utils";
import type { IBoardRepository } from "../domain";

export class DeleteBoardUseCase {
	constructor(private readonly boardRepository: IBoardRepository) {}

	async execute(id: string): Promise<Result<void, Error>> {
		return await this.boardRepository.delete(id);
	}
}
