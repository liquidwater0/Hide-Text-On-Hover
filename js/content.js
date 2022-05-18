setTimeout(() => {
    updateText();
}, 1000);

function getNodes() {
    const textNodes = [];
    const elementNodes = [];

    const treeWalker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: node => {
                const rejectedElements = ["style", "script"];

                if (
                    rejectedElements.some(item => item.toUpperCase === node.parentElement.tagName) ||
                    node.nodeValue.trim() === ""
                ) return NodeFilter.FILTER_SKIP;

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let currentNode = treeWalker.currentNode;

    while (currentNode) {
        textNodes.push(currentNode);
        elementNodes.push(currentNode.parentElement);
        currentNode = treeWalker.nextNode();
    }

    textNodes.shift();
    elementNodes.shift();

    return {
        text: textNodes,
        elements: elementNodes
    };
}

function updateText() {
    const { text, elements } = getNodes();

    text.forEach((node, index) => {
        modifyText(node.nodeValue, elements[index]);
        node.remove();
    });
}

function modifyText(text, element) {
    const characters = text.split("");

    characters.forEach(character => {
        const span = document.createElement("span");

        span.setAttribute("data-extension", "hideTextOnHover");
        span.classList.add("hide-on-hover");
        span.textContent = character;

        element.appendChild(span);
    });
}