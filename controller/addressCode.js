

const axios = require('axios');
const parseString = require('xml2js').parseString;


function parseStringP(str) {
    return new Promise((resolve, reject) => { parseString(str, function (err, res) { if (err) reject(err); else resolve(res) }) })
}

async function getY() {
    const headers = { 'Referer': 'http://adreskodu.dask.gov.tr/' };
    const url = 'http://adreskodu.dask.gov.tr/site-element/control/y.ashx';

    try {
        let response = await axios({ method: 'post', url, headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}


module.exports.getIl = async function (req, res) {
    try {
        const y = await getY();
        const dataString = y + '&t=il&u=0';
        const url = 'http://adreskodu.dask.gov.tr/site-element/control/load.ashx';

        let response = await axios({ method: 'post', url, data: dataString });

        ([, ...jsonArray] = response.data.yt.map(({ value, text }) => ({ id: parseInt(value), name: text })))

        res.status(200).json(jsonArray);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getIlce = async function (req, res) {

    try {
        const y = await getY();
        const dataString = y + '&t=ce&u=' + req.params['id'];
        const url = 'http://adreskodu.dask.gov.tr/site-element/control/load.ashx';

        let response = await axios({ method: 'post', url, data: dataString });

        ([, ...jsonArray] = response.data.yt.map(({ value, text }) => ({ id: parseInt(value), name: text })))

        res.status(200).json(jsonArray);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getBucakKoy = async function (req, res) {

    try {
        const y = await getY();
        const dataString = y + '&t=vl&u=' + req.params['id'];
        const url = 'http://adreskodu.dask.gov.tr/site-element/control/load.ashx';

        let response = await axios({ method: 'post', url, data: dataString });

        ([, ...jsonArray] = response.data.yt.map(({ value, text }) => ({ id: parseInt(value), name: text })))

        res.status(200).json(jsonArray);
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports.getMahalle = async function (req, res) {
    try {
        const y = await getY();
        const dataString = y + '&t=mh&u=' + req.params['id'];
        const url = 'http://adreskodu.dask.gov.tr/site-element/control/load.ashx';

        let response = await axios({ method: 'post', url, data: dataString });

        ([, ...jsonArray] = response.data.yt.map(({ value, text }) => ({ id: parseInt(value), name: text })))

        res.status(200).json(jsonArray);
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports.getSokak = async function (req, res) {

    try {
        const y = await getY();
        const dataString = y + '&t=sf&u=' + req.params['id'];
        const url = 'http://adreskodu.dask.gov.tr/site-element/control/load.ashx';

        let response = await axios({ method: 'post', url, data: dataString });

        let dat = '<doc>' + response.data + '</doc>'
        dat = dat.replace('&nbsp;', '');


        const xmlDoc = await parseStringP(dat);
        const root = xmlDoc.doc.tbody[0].tr;

        const jsonArray = root.map(({ $: { id }, td }) =>
            ({
                id, name: td[1], type: td[0]._, pureId: parseInt(id.substring(1, id.length))
            })
        );

        res.status(200).json(jsonArray);
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports.getBina = async function (req, res) {

    try {
        const y = await getY();

        const dataString = y + '&t=dk&u=' + req.params['id'];
        const url = 'http://adreskodu.dask.gov.tr/site-element/control/load.ashx';

        let response = await axios({ method: 'post', url, data: dataString });

        let dat = '<doc>' + response.data + '</doc>'
        dat = dat.replace('&nbsp;', '');
        dat = dat.replace('</tr<', '</tr><');

        let xmlDoc = await parseStringP(dat);
        console.log(xmlDoc);
        const root = xmlDoc.doc.tbody[0].tr;

        const jsonArray = root.map(({ $: { id }, td }) =>
            ({
                id, binaNumarasi: td[0]._, pureId: parseInt(id.substring(1, id.length))
            })
        );

        res.status(200).json(jsonArray);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getDaire = async function (req, res) {
    try {
        const y = await getY();
        const dataString = y + '&t=ick&u=' + req.params['id'];
        const url = 'http://adreskodu.dask.gov.tr/site-element/control/load.ashx';

        let response = await axios({ method: 'post', url, data: dataString });
        let dat = '<doc>' + response.data + '</doc>'

        const xmlDoc = await parseStringP(dat);
        const root = xmlDoc.doc.tbody[0].tr;

        const jsonArray = root.map(({ $: { id }, td }) =>
            ({
                id, no: td[1], type: td[0]._, pureId: parseInt(id.substring(1, id.length))
            })
        );
        res.status(200).json(jsonArray);
    } catch (error) {
        res.status(500).json(error);
    }
}