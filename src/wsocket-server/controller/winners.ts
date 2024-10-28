import { socketClients } from '../collections/socket-clients';
import { winners } from '../collections/winners';
import { RequestResponseTypes } from '../enums/request-response-types';
import { prepareResponse } from '../helpers/prepare-response';
import { stringifyData } from '../helpers/stringify-data';

export const sendWinnersRequest = () => {
  socketClients.forEach((client) => {
    const resDataStr = stringifyData(winners.getWinners());
    client.send(prepareResponse(RequestResponseTypes.UpdateWinners, resDataStr));
  });
};
