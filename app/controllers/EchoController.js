import configJson from '../../config/config';

const environment = configJson.environment;
const Config = configJson[environment];

class EchoController {
  static async echoGet(req, res) {
    const echoID = (typeof req.params.id === 'undefined') ? '' : req.params.id;
    res.header('x-header', 'example header content #1');
    return res.json({
      status: 200,
      msg: 'Echo Get',
      name: Config.system.name,
      id: echoID,
      query: req.query
    });
  }

  static async echoPost(req, res) {
    res.header('x-header', 'example header content #2');
    const jsonBody = req.body;
    return res.json({
      status: 200, msg: 'Echo Post', query: req.query, data: jsonBody
    });
  }
}

export default EchoController;
