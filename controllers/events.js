const { response } = require('express');
const Evento = require('../models/Events');

const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

        res.status(201).json({
            ok:true,
            eventos
        });
}

const crearEvento = async(req, res = response) => {

    const evento = new Evento(req.body);

    try{

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    }catch(err){
        console.log( err)
        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador'
        });
    }
    res.status(201).json({
        ok:true,
        msg: 'crear Evento'
    });

}

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese Id'
            });
        }

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new : true } );

        res.json({
            ok:true,
            evento: eventoActualizado,
        })

    }catch( err ){
        console.log( err)
        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador'
        });
    }


    res.status(201).json({
        ok:true,
        eventoId
    });


}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese Id'
            });
        }

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de borrar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndDelete( eventoId, nuevoEvento, { new : true } );

        res.json({
            ok:true,
        })

    }catch( err ){
        console.log( err)
        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador'
        });
    }

}

module.exports= {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}