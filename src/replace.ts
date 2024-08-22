function replaceSubstring(s: string, a: string, b: string) {
  return s.replace(new RegExp(a, 'g'), b);
}

export function replace(s: string, words: { input: string, replace: string }[]) {
  for (const word of words) {
    s = replaceSubstring(s, word.input, word.replace)
  }
  return s;
}


// class TrieNode {
//   children: { [key: string]: TrieNode };
//   isEndOfWord: boolean;
//   constructor() {
//     this.children = {};
//     this.isEndOfWord = false;
//   }
// }

// class Trie {
//   root: TrieNode;
//   constructor() {
//     this.root = new TrieNode();
//   }

//   getRoot() {
//     return this.root;
//   }

//   // Insert a word into the trie
//   insert(word: string) {
//     let node = this.root;
//     for (let char of word) {
//       if (!node.children[char]) {
//         node.children[char] = new TrieNode();
//       }
//       node = node.children[char];
//     }
//     node.isEndOfWord = true;
//   }

//   // Search for a word in the trie
//   search(word: string) {
//     let node = this.root;
//     for (let char of word) {
//       if (!node.children[char]) {
//         return false;
//       }
//       node = node.children[char];
//     }
//     return node.isEndOfWord;
//   }

//   // Check if there is any word in the trie that starts with the given prefix
//   startsWith(prefix: string) {
//     let node = this.root;
//     for (let char of prefix) {
//       if (!node.children[char]) {
//         return false;
//       }
//       node = node.children[char];
//     }
//     return true;
//   }

// }
