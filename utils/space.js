function space(text) {
    maxLength = 80;

    //split text into lines
    var newLines = text.split(/\n/);

    for (var i = 0; i < newLines.length; i++) {

        //delete spaces from the begin and the end of line
        var line = newLines[i].trim();
        
        //if length line doesn't excees 80 caracteres continue executing the code else we pass to the next line
        if (line.length >= maxLength) {
            
            continue;
        }
        var k = 1;
        for (var j = 0; j < line.length; j++) {

            //if we found spaces we delete them and skip with k 
            if (line[j] == " " && line.length < maxLength) {
                line = setCharAt(line, j, "  ");
                j = j + k;
                
            }
            //if we are in the end of the line we re-initialize j
            if (j == line.length - 1 && line.length < maxLength) {
                j = 0;
                k++;
            }
        }
        //replace line with modified one
        newLines[i] = line;
    }
    return newLines.join("\n");

}


function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    //shift the line and removing space
    return str.substr(0, index) + chr + str.substr(index + 1);
}

module.exports=space;