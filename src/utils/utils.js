export let gettime=(utime)=>{

    let date = (typeof utime == 'number' ? new Date(utime) : utime)

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

