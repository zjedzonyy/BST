const Node = (value) => {
    let data = value;
    let left = null;
    let right = null;

    return { data, left, right };
};

const Tree = (array) => {
    let arr = sortAndRemoveDuplicates(array);
    let root = sortedArrayToBST(arr);

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };

    prettyPrint(root);

    return { arr, root };
}


const buildTree = (arr, start, end) => {
    if (start > end) return null;
    
    let mid = start + Math.floor((end - start) / 2);
    let root = Node(arr[mid]);

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);

   
    return root;
}

const sortAndRemoveDuplicates = (array) => {
    return [...new Set(array)].sort((a, b) => a - b);
}

const sortedArrayToBST = (arr) => {
    return buildTree(arr, 0, arr.length - 1);
}

 
const ex = Node(1);
const tree = Tree([5,21,3,1,99,99,2,10,11,12,45,13,86,91,123]);
// console.log(tree);

