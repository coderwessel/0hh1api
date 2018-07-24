// src/games/controller.ts
import { JsonController, Get, Param, Put, Delete, Body, NotFoundError, HttpCode, Post} from 'routing-controllers'
import Game from './entity';

@JsonController()
export default class GameController {


    // part of src/games/controller.ts

    @Get('/games/:id')
    getGame(
    @Param('id') id: number
    ) {
    return Game.findOne(id)
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