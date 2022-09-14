import express, { request, response } from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { formatMinutesToStringHour, formatStringHourToMinutes } from "./utils";

const app = express();
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({ log: ['query'] });

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });
    return response.status(200).json(games);
});

app.get("/games/:id/ads", async (request, response) => {

    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response.status(200).json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: formatMinutesToStringHour(ad.hourStart),
            hourEnd: formatMinutesToStringHour(ad.hourEnd)
        }
    }));
});

app.post('/ads', async (request, response) => {

    const ad = await prisma.ad.create({
        data: {
            gameId: request.body.gameId,
            name: request.body.name,
            yearsPlaying: request.body.yearsPlaying,
            discord: request.body.discord,
            weekDays: request.body.weekDays.join(','),
            hourStart: formatStringHourToMinutes(request.body.hourStart),
            hourEnd: formatStringHourToMinutes(request.body.hourEnd),
            useVoiceChannel: request.body.useVoiceChannel
        }
    });

    return response.status(201).json(ad);
});

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId
        }
    });

    return response.status(200).json({ discord: ad.discord });
});

app.listen(4000);