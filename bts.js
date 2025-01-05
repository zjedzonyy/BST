const Node = (value) => {
    let data = value;
    let left = null;
    let right = null;

    return { data, left, right };
};

const Tree = (array) => {
    let arr = sortAndRemoveDuplicates(array);
    let root = sortedArrayToBTS(arr);

    const insert = (value) => {
        const insertNode = (node, value) => {
            if (node === null) {
                return Node(value); 
            }
            if (node.data === value) {
                return node;
            }
    
            if (value < node.data) {
                node.left = insertNode(node.left, value); 
            } else if (value > node.data) {
                node.right = insertNode(node.right, value); 
            }
    
            return node; 
        };

        root = insertNode(root, value);
        prettyPrint(root);

    };

    const deleteItem = (value) => {
        const getSuccessor = (curr) => {
            curr = curr.right;
            while (curr !== null && curr.left !== null) {
                curr = curr.left;
            }
            return curr;
        }

        const deleteNode = (node, value) => {
            // Empty BST
            if (node === null) {
                return node;
            }

            if (value < node.data) {
                node.left = deleteNode(node.left, value);
            } else if (value > node.data) {
                node.right = deleteNode(node.right, value);
            } else {
                // If root matches with the given value

                // Case 1: Has 0 chilldren or only right children
                if (node.left === null) return node.right;

                // Case 2: Has only left child
                if (node.right === null) return node.left;

                // Case 3: Has both children
                let succ = getSuccessor(node);
                node.data = succ.data;
                node.right = deleteNode(node.right, succ.data);
            }

            return node;
        }
        root = deleteNode(root, value);
        prettyPrint(root);
    }

    const find = (value) => {
        const findValue = (node, value) => {
            if (node === null) {
                return null;
            }

            if (node.data === value) {
                return node;
            } 
            
            if (value < node.data) {
                return findValue(node.left, value);
            } else {
                return findValue(node.right, value);
            }
        }

        const result = findValue(root, value);
        return result;

    };

    const levelOrder = (callback) => {
        if (typeof callback !== "function") {
            throw new Error ("A valid callback function is required!");
        }
        let q = [root];

        while (q.length !== 0) {
            // Use a callback function
            callback(q[0]);

            // Add children to q
            if (q[0].left !== null) {
                q.push(q[0].left);
            }
            if (q[0].right !== null) {
                q.push(q[0].right);
            }

            // Remove current node from the q
            q.shift()
        }
    };

    const inOrder = (callback) => {
        if (typeof callback !== "function") {
            throw new Error ("A valid callback function is required!");
        }

        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                callback(node);
                traverse(node.right);
            }
        };

        const result = traverse(root);
    };

    const preOrder = (callback) => {
        if (typeof callback !== "function") {
            throw new Error ("A valid callback function is required!");
        }
        const traverse = (node) => {
            if (node !== null) {
                callback(node);
                traverse(node.left);
                traverse(node.right);
            }
        };

        const result = traverse(root);
    };

    const postOrder = (callback) => {
        if (typeof callback !== "function") {
            throw new Error ("A valid callback function is required!");
        }

        const traverse = (node) => {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                callback(node);
            }
        };

        const result = traverse(root);
    };

    const height = (node) => {
        if (node === null) {
            return 0;
        }
        
        return 1 + Math.max(height(node.left), height(node.right));
    };

    const depth = (node) => {
        const height = height(root);
        const heightNode = height(node);

        const result = height - heightNode;
        return result;
       
 
    }

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

    return { arr, root, insert, deleteItem, find, levelOrder, inOrder, preOrder, postOrder, height, depth };
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

const sortedArrayToBTS = (arr) => {
    return buildTree(arr, 0, arr.length - 1);
}

 
const tree = Tree([5,21,3,1,99,99,2,10,11,12,45,13,86,91,123]);
console.log(tree.height(tree.root));

