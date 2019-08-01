// 原始 list 如下
let list = [{
        id: 1,
        name: '部门A',
        parentId: 0
    },
    {
        id: 2,
        name: '部门B',
        parentId: 0
    },
    {
        id: 3,
        name: '部门C',
        parentId: 1
    },
    {
        id: 4,
        name: '部门D',
        parentId: 1
    },
    {
        id: 5,
        name: '部门E',
        parentId: 2
    },
    {
        id: 6,
        name: '部门F',
        parentId: 3
    },
    {
        id: 7,
        name: '部门G',
        parentId: 2
    },
    {
        id: 8,
        name: '部门H',
        parentId: 4
    }
];

function convert(arr){
    const res=[];
    const map=list.reduce((res,v)=>(res[v.id]=v,res),{})
    for(let item of list){
        if(item.parentId===0){ //如果是根节点
            res.push(item); 
            // continue;
        }
        if(item.parentId in map){  //
            let parent=map[item.parentId];
            parent.children=parent.children||[];
            parent.children.push(item);
        }
    }
    return res;
}

const result = convert(list);
console.log(result);
