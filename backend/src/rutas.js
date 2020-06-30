const express = require('express')
const router = express.Router();
const conn = require('./db')

router.get('/api/v1/entidades/:id', (req, res) => {
    const { id } = req.params;    
    conn.query(`SELECT SUM(PERSONAS_H) PERSONAS_H,SUM(CONFIRMADOS_H) CONFIRMADOS_H,SUM(CONFACTIVOS_H) CONFACTIVOS_H,
        SUM(DEFUNCIONES_H) DEFUNCIONES_H,SUM(SOSPECHOSOS_H) SOSPECHOSOS_H,SUM(NEGATIVOS_H) NEGATIVOS_H,SUM(PERSONAS_M) PERSONAS_M,
        SUM(CONFIRMADOS_M) CONFIRMADOS_M,SUM(CONFACTIVOS_M) CONFACTIVOS_M,SUM(DEFUNCIONES_M) DEFUNCIONES_M,
        SUM(SOSPECHOSOS_M) SOSPECHOSOS_M,SUM(NEGATIVOS_M) NEGATIVOS_M,AVG(PERSONAS_EDAD) PERSONAS_EDAD,
        AVG(CONFIRMADOS_EDAD) CONFIRMADOS_EDAD,AVG(CONFACTIVOS_EDAD) CONFACTIVOS_EDAD,AVG(DEFUNCIONES_EDAD) DEFUNCIONES_EDAD,
        AVG(SOSPECHOSOS_EDAD) SOSPECHOSOS_EDAD,AVG(NEGATIVOS_EDAD) NEGATIVOS_EDAD
        FROM COVID.ACUMULADOS where ID_ENT=?`,[id],(err,rows,fields)=>{
            if (!err){
                res.json(rows)
            } else { console.log(err)}
        })
})

router.get('/api/v1/entidades',(req,res)=>{
    conn.query(`SELECT ID_ENT,
                    SUM(PERSONAS_H) PERSONAS_H,SUM(CONFIRMADOS_H) CONFIRMADOS_H,SUM(CONFACTIVOS_H) CONFACTIVOS_H,
                    SUM(DEFUNCIONES_H) DEFUNCIONES_H,SUM(SOSPECHOSOS_H) SOSPECHOSOS_H,SUM(NEGATIVOS_H) NEGATIVOS_H,SUM(PERSONAS_M) PERSONAS_M,
                    SUM(CONFIRMADOS_M) CONFIRMADOS_M,SUM(CONFACTIVOS_M) CONFACTIVOS_M,SUM(DEFUNCIONES_M) DEFUNCIONES_M,
                    SUM(SOSPECHOSOS_M) SOSPECHOSOS_M,SUM(NEGATIVOS_M) NEGATIVOS_M,AVG(PERSONAS_EDAD) PERSONAS_EDAD,
                    AVG(CONFIRMADOS_EDAD) CONFIRMADOS_EDAD,AVG(CONFACTIVOS_EDAD) CONFACTIVOS_EDAD,AVG(DEFUNCIONES_EDAD) DEFUNCIONES_EDAD,
                    AVG(SOSPECHOSOS_EDAD) SOSPECHOSOS_EDAD,AVG(NEGATIVOS_EDAD) NEGATIVOS_EDAD
                FROM COVID.ACUMULADOS
            group by ID_ENT
            order by ID_ENT ASC`,(err,rows,fields)=>{
                if (!err){
                    res.json(rows)
                } else {console.log(err)}
            })
})



router.get('/api/v1/series/confirmados/:id',(req,res)=>{
    const { id } =req.params;
    conn.query(`select s.FECHA, ifnull(CONFIRMADOS,0) CONFIRMADOS, ifnull(SOSPECHOSOS,0) SOSPECHOSOS
                from COVID.FECHAS_SERIES s
                left  join 
                (select t.fecha,sum(IFNULL(TOTAL,0)) CONFIRMADOS fROM COVID.ACUMULADOS_SERIES t
                    where t.id_ent=? and t.SERIE='CONFIRMADOS'
                    group by t.fecha) t1 on (t1.fecha=s.fecha)
                left join 
                (select t.fecha,sum(IFNULL(TOTAL,0)) SOSPECHOSOS fROM COVID.ACUMULADOS_SERIES t
                    where t.id_ent=? and t.SERIE='SOSPECHOSOS'
                    group by t.fecha) t2 on (t2.fecha=s.fecha)          
                where ifnull(CONFIRMADOS,0)+ifnull(SOSPECHOSOS,0)>0
                order by FECHA`,[id,id],(err,rows,fields)=>{
            if(!err){
                res.json(rows)
            } else {
                console.error(err)
            }
        })
})

router.get('/api/v1/series/defunciones/:id',(req,res)=>{
    const { id } =req.params;
    conn.query(`select s.FECHA,ifnull(DEFUNCIONES,0) DEFUNCIONES,ifnull(DEFSOSP,0) DEFSOSP
        from COVID.FECHAS_SERIES s
        left join
        (select t.fecha,sum(IFNULL(TOTAL,0)) DEFUNCIONES fROM COVID.ACUMULADOS_SERIES t
            where t.id_ent=? and t.SERIE='DEFUNCIONES'
            group by t.fecha) t3 on (t3.fecha=s.fecha)        
        left join
        (select t.fecha,sum(IFNULL(TOTAL,0)) DEFSOSP fROM COVID.ACUMULADOS_SERIES t
            where t.id_ent=? and t.SERIE='DEFSOSP'
            group by t.fecha) t4 on (t4.fecha=s.fecha)  
        where ifnull(DEFUNCIONES,0)+ifnull(DEFSOSP,0)>0
        order by FECHA`,[id,id],(err,rows,fields)=>{
            if(!err){
                res.json(rows)
            } else {
                console.error(err)
            }
        })
})


router.get('/api/v1/series/estados',(req,res)=>{
    conn.query(`select t.NOMBRE Nombre,sum(CONFIRMADOS_H+CONFIRMADOS_M) Confirmados from COVID.ACUMULADOS s
                inner join COVID.CAT_ENTIDADES t on (t.id_ent=s.id_ent)
                where s.ID_ENT>0
                group by t.NOMBRE
                order by sum(CONFIRMADOS_H+CONFIRMADOS_M)  desc`,(err,rows,fields)=>{
            if(!err){
                res.json(rows)
            } else {
                console.error(err)
            }
        })
})

router.get('/api/v1/series/municipios/:id',(req,res)=>{
    const { id } =req.params;
    conn.query(`select m.NOMBRE Nombre,sum(CONFIRMADOS_H+CONFIRMADOS_M) Confirmados from COVID.ACUMULADOS s
                inner join COVID.CAT_MUNICIPIOS m on (m.id_ent=s.id_ent and m.id_mpio=s.id_mpio)
                where s.ID_ENT=?
                group by m.NOMBRE
                order by sum(CONFIRMADOS_H+CONFIRMADOS_M)  desc`,[id],(err,rows,fields)=>{
            if(!err){
                res.json(rows)
            } else {
                console.error(err)
            }
        })
})

router.get('/api/v1/ultUpdate',(req,res)=>{
    conn.query('select FECHA from COVID.APPINFO limit 1',(err,rows,fields)=>{
        if (!err){
            res.json(rows)
        } else {console.error(err)}
    })
})



module.exports = router