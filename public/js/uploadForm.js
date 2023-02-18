function fileSize()
{
    // alert config
    const color = "red"
    const element = "p"
    const messages = {emptyFile: "selecione um arquivo primeiro",
    tooBigFile: "apenas arquivos de até 1mb são aceitos!",
    fileType: "apenas arquivos de imagens são aceitos"}
    const idAlert = "alert"

    // file config
    const limitSize = 1000000
    const idFile = "file"

    const file = document.getElementById(idFile)
    if(file.files[0] == undefined)
    {
        alert(element, color, messages.emptyFile, idAlert)
        return false
    }
    else if(file.files[0].size > limitSize)
    {
        alert(element, color, messages.tooBigFile, idAlert)
        return false
    }
    else if(file.files[0].type != "image/jpeg" && file.files[0].type != "image/png")
    {
        console.log(file.files[0].type)
        alert(element, color, messages.fileType, idAlert)
        return false
    }
    return true
}

function alert(element, color, message, id)
{
    if(document.getElementById(id))
    {
        document.getElementById(id).remove(id)
    }
    const alert = document.createElement(element)
    alert.style.color = color
    alert.innerHTML = message
    alert.id = id
    document.body.appendChild(alert)
}