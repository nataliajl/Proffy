const Database = require('./database/db.js')
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format.js') // desestruturar

function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){
    
    const filters = req.query

        if (!filters.subject || !filters.weekday || !filters.time){
            return res.render("study.html", {filters, subjects, weekdays})
        }

        const timeToMinutes =  convertHoursToMinutes(filters.time)

        const query = `
            SELECT classes.*, proffys.* 
            FROM proffys JOIN classes 
            ON (classes.proffy_id = proffys.id)
            WHERE EXISTS (
                SELECT class_schedule.* FROM class_schedule 
                WHERE class_schedule.class_id = classes.id
                AND class_schedule.weekday = ${filters.weekday}
                AND class_schedule.time_from <= ${timeToMinutes}
                AND class_schedule.time_to > ${timeToMinutes}
            )
            AND classes.subject = ${filters.subject}
            `
        
        try {
            const db = await Database
            const proffys = await db.all(query)
            proffys.map((proffy) => {
                console.log(proffy.subject)
                    proffy.subject = getSubject(proffy.subject)
                    
            })
            console.log(proffys)
            return res.render("study.html", {proffys, filters, subjects, weekdays})
        } catch (error) {
            console.log(error)
 
        }
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy.js')
    const data = req.body

     //Inserir dados
    const proffyValue = { 
        name: data.name, 
        avatar: data.avatar, 
        whatsapp: data.whatsapp,
        bio: data.bio 
    }

    const classValue = {
        subject: data.subject, 
        cost: data.cost 
    }

    const classScheduleValues = data.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(data.time_from[index]),
            time_to: convertHoursToMinutes(data.time_to[index])
        }
    })

    try {
        const db =  await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})
    } catch (error) {
        console.log(error)
    }
    

    let queryString = "?subject=" + data.subject + "&weekday=" + data.weekday[0] + "&time=" + data.time_from[0]   
    return res.redirect("/study" + queryString)
    
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}