// src/games/controller.ts
import { JsonController, Get, Param, Put, Patch, Delete, Body, NotFoundError, HttpCode, Post} from 'routing-controllers'
import Game from './entity';

@JsonController()
export default class GameController {


    // part of src/games/controller.ts

    @Get('/games/:id')
    async getGame(
    @Param('id') id: number
    ) {
        const thisgame = await Game.findOne(id)
        return { game: thisgame }
    }

    @Get('/games')
    async allGames() {
    const games = await Game.find()
    return { games }
    }

    @Put('/games/:id')
    async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
    ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    const thisgame = await Game.merge(game, update).save()
    return {game: thisgame}
    }

    @Patch('/games/:id')
    async patchGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
    ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')

    return Game.merge(game, update).save()
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
    @Body() game: Game
    ) {
    return game.save()
    }

    @Delete('/games/:id')
    @HttpCode(204)
    async deleteGame(
    @Param('id') id: number,
    ) {
        const game = await Game.delete(id)
        return game
    }


}