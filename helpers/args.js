export const getArgs = (args) => {

    const res = {}

    const [node, file, ...rest] = args

    rest.forEach((item, index, array) => {
        if(item.charAt(0) === "-"){
            if(index == array.length - 1){
                res[item.substring(1)] = true
            }
            else if(array[index+1].charAt(0) !== "-"){
                res[item.substring(1)] = array[index + 1]
            }
            else {
                res[item.substring(1)] = true
            }
        }
    })
    return res
}