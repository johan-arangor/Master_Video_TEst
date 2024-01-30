const servicesController = {};
const mysql = require('../src/middleware/connection');

servicesController.getAllVideos = async (req, res) => {
    let dataForm = req.params.dateTimeGet;

    mysql.query(`SELECT vd.vid_id, vd.vid_name, vd.vid_dateUp, vd.vid_likes FROM videos AS vd
        INNER JOIN videos_authors AS va ON va.vya_idVideo = vd.vid_id
        WHERE vd.vid_dateUp = ${dataForm} AND vd.vid_disabled = 0
        ORDER BY vd.vid_dateUp`, 
    function (err, result) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: result
            });
        }
    });
}

servicesController.getAllVideosUserId = async (req, res) => {
    let dataForm = req.params.id;

    mysql.query(`SELECT vd.vid_id, vd.vid_name, vd.vid_dateUp, vd.vid_likes FROM videos AS vd
    INNER JOIN videos_authors AS va ON va.vya_idVideo = vd.vid_id
    WHERE va.vya_idUser = ${dataForm} AND vd.vid_disabled = 0`, 
    function (err, result) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: result
            });
        }
    });
}

servicesController.newVideo = async (req, res) => {
    let dataForm = req.body;
    
    mysql.query(`INSERT INTO videos (${Object.keys(dataForm).join(",")}) 
    VALUES ('${dataForm.name}', ${dataForm.id_category})`, 
    function (err, result) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: null,
                message: {
                    title: "Video agregado con éxito",
                    text: "Se ha agregado con éxito el video",
                    icon: "success"
                }
            });
        }
    });
}

servicesController.editVideo = async (req, res) => {
    let dataForm = req.body;
    
    mysql.query(`UPDATE videos SET vid_name = '${dataForm.name}', vid_extension = '${dataForm.extension}', vid_nameFileGuid = '${dataForm.nameFileGuid}', vid_dateUp = '${dataForm.dateUp}', vid_Status = '${dataForm.Status}' 
        WHERE vid_id = '${dataForm.id}'`, 
    function (err) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: null,
                message: {
                    title: "Video editado con éxito",
                    text: "Se ha editado con éxito el video",
                    icon: "success"
                }
            });
        }
    });
}

servicesController.deleteVideo = async (req, res) => {
    try {
        let dataForm = req.body;

        updateDataState(dataForm.id)
        .then((responseUpdate) => {
            res.status(200).json(responseUpdate);
        })
        .catch((err) => {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        });
    } 
    catch (error) {
        res.status(500).json({
            data: null,
            message: {
                title: "Ocurrion un error inesperado",
                text: `error ${err}`,
                icon: "error"
            }
        });
    }
}

servicesController.getComments = async (req, res) => {
    let dataForm = req.params.id;
    
    mysql.query(`SELECT cm.cmt_comment, us.userName. cm.cmt_dateTime FROM videos AS vd
        INNER JOIN comments AS cm ON cm.cmt_idVideo = vd.vid_id
        INNER JOIN users AS us ON cm.cmt_idUser = us.id
        WHERE	vd.vid_id = ${dataForm}`, 
    function (err, result) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: result,
                message: null
            });
        }
    });
}

servicesController.getColaborators = async (req, res) => {
    let dataForm = req.params.id;
    
    mysql.query(`SELECT us.userName FROM videos AS vd
        INNER JOIN videos_colaborators AS vc ON vc.vya_idVideo = vd.vid_id
        INNER JOIN users AS us ON vc.vya_idUser = us.id
        WHERE	vd.vid_id = ${dataForm}
        ORDER BY us.userName`, 
    function (err, result) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: result,
                message: null
            });
        }
    });
}

servicesController.getLikes = async (req, res) => {
    let dataForm = req.params.id;
    
    mysql.query(`SELECT vd.vid_likes FROM videos AS vd
        WHERE	vd.vid_id = ${dataForm}`, 
    function (err, result) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: result,
                message: null
            });
        }
    });
}

servicesController.postColaborator = async (req, res) => {
    let dataForm = req.body;
    
    mysql.query(`INSERT INTO videos_colaborators (${Object.keys(dataForm).join(",")}) 
        VALUES ('${dataForm.idUser}', ${dataForm.idVideo})`, 
    function (err) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: null,
                message: {
                    title: "Colaborador agregado con éxito",
                    text: "Se ha agregado con éxito el colaborador",
                    icon: "success"
                }
            });
        }
    });
}

servicesController.postComment = async (req, res) => {
    let dataForm = req.body;
    
    mysql.query(`INSERT INTO comments (${Object.keys(dataForm).join(",")}) 
        VALUES ('${dataForm.comment}', ${dataForm.dateTime}, '${dataForm.idUser}', ${dataForm.idVideo})`, 
    function (err) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: null,
                message: {
                    title: "Comentario agregado con éxito",
                    text: "Se ha agregado con éxito el comentario",
                    icon: "success"
                }
            });
        }
    });
}

servicesController.postLikes = async (req, res) => {
    let dataForm = req.body;
    
    mysql.query(`UPDATE videos SET vid_likes = '${dataForm.like}'
        WHERE vid_id = '${dataForm.id}'`, 
    function (err) 
    {
        if (err) {
            res.status(500).json({
                data: null,
                message: {
                    title: "Ocurrion un error inesperado",
                    text: `error ${err}`,
                    icon: "error"
                }
            });
        } else {
            res.status(200).json({
                data: null,
                message: null
            });
        }
    });
}

function updateDataState(id) {
    return new Promise((resolve, reject) => {
        mysql.query(`UPDATE categories_sub SET disable = 1 WHERE id = ${id}`, 
        function (err, result) 
        {
            if (err) {
                reject({
                        data: null,
                        message: {
                            title: "Ocurrion un error inesperado",
                            text: `error ${err}`,
                            icon: "error"
                        }
                    }
                );
            } else {
                resolve({
                        data: null,
                        message: {
                            title: "Sub Categoría eliminada con éxito",
                            text: "Se ha eliminado con éxito la sub categoría",
                            icon: "success"
                        }
                    }
                );
            }
        });
    });
}

module.exports = servicesController;