let str = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>`;

    [1,2,3,4].forEach(item=>{
       str+=`<li>${item}</li>`
   })
str+=`</body>
</html>`


console.log(str);