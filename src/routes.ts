import * as express from 'express';
import SystemStatusController from './components/system-status/system-status.controller';
import TwitchAuthController from './components/twitch-auth/twitch-auth.controller';


export default function registerRoutes(app: express.Application): void {
    new SystemStatusController(app);
    new TwitchAuthController(app);
}
