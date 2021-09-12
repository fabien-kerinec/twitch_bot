import { Application, NextFunction, Request, Response } from 'express';
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';
import axios, { AxiosInstance } from 'axios';
import * as responsehandler from '../../lib/response-handler';
import ApiError from '../../abstractions/ApiError';
import BaseApi from '../BaseApi';
import { botModel } from '../../db/bot';

/**
 * Twitch controller
 */
export default class TwitchAuthController extends BaseApi {
    redirect_uri  = `${process.env.TWITCH_CLIENT_REDIRECT}/auth/twitch/callback`;

    authBaseUrl   = 'https://id.twitch.tv/oauth2';

    authAPI :AxiosInstance = axios.create({
      baseURL: this.authBaseUrl,
    }); 

  constructor(express: Application) {
    super();
    this.register(express);
  }

  public register(express: Application): void {
    // eslint-disable-next-line no-console
    console.log('register ', this.redirect_uri);
    
    express.use('/auth/twitch', this.router);
    this.router.get('/', this.auth.bind(this));
    this.router.get('/callback', this.callback.bind(this));
  }
  
  public auth (req: Request, res: Response, next: NextFunction): void {
    try {
      // eslint-disable-next-line no-console
      console.log(this);
      
      const qs = new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID,
        redirect_uri: this.redirect_uri,
        response_type: 'code',
        scope: 'chat:read chat:edit whispers:read'
      });
      // eslint-disable-next-line no-console
      console.log(qs);
      
      const redirectUrl = `${this.authBaseUrl}/authorize?${qs}`;
      res.redirect(redirectUrl);
    } catch (err) {
      next(err);
    }
  }

  public async callback(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const { code }: { code?: string } = req.query;


      if (!code) {
        throw new ApiError(ReasonPhrases.UNPROCESSABLE_ENTITY, StatusCodes.UNPROCESSABLE_ENTITY);
      }

      const qs = new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirect_uri
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bot: any = await botModel.findOneAndUpdate({ name: 'fabkerbot' }, { name: 'fabkerbot' }, { upsert:true });
      const response = await this.authAPI.post(`/token?${qs}`);
      bot.refresh_token = response.data.refresh_token;
      bot.save();
      
      res.json(response.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      
      next(err);
    }
  }
}
