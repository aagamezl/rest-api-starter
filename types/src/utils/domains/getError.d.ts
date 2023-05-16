export function getError(error: any): {
    type: string;
    status: StatusCodes;
    title: ReasonPhrases;
    details: any;
};
import { StatusCodes } from "http-status-codes";
import { ReasonPhrases } from "http-status-codes";
