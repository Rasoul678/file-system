export abstract class Item {
  private _name: string;
  private _parent: Directory | null;

  constructor(name: string) {
    this._name = name;
    this._parent = null;
  }

  get path(): string {
    if (this.parent) {
      return `${this.parent.path}/${this.name}`;
    }

    return this.name;
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    if (!newName || typeof newName !== "string" || !newName.trim().length) {
      throw new Error("Item name must be a non empty string");
    }

    if (newName.includes("/")) {
      throw new Error("Item name contains invalid symbol");
    }

    if (this.parent && this.parent.hasItem(newName)) {
      throw new Error(
        `Item with name of "${newName}" already exists in this directory`
      );
    }

    this._name = newName.trim();
  }

  get parent() {
    return this._parent;
  }

  set parent(newParent: Directory | null) {
    if (newParent !== this._parent) {
      const prevParent: Directory | null = this._parent;
      this._parent = newParent;

      if (prevParent) {
        prevParent.removeItem(this.name);
      }

      if (newParent) {
        newParent.insertItem(this as unknown as Directory);
      }
    }
  }
}

export class FileItem extends Item {
  private _type: string;
  private _mimeType: string;
  private _textContent: string;
  private _source: any;

  constructor(
    name: string = "",
    textContent: string = "",
    source: File | null = null
  ) {
    super(name || "un-named file");
    this._textContent = textContent;
    this._type = "text";
    this._mimeType = "txt";
    this.source = source;
  }

  get textContent() {
    return this._textContent;
  }

  set textContent(content) {
    this._textContent = `${content || ""}`;
  }

  get source() {
    return this._source;
  }

  set source(newSource: File | null) {
    this._source = newSource;

    if (newSource && newSource.type) {
      let [type, mime] = newSource.type.split("/");
      let mimeMatch = mime.match(/[\w-]+/g);

      this._type = type || "text";
      this._mimeType = 
        !mimeMatch || mimeMatch[0] === "plain" ? "txt" : mimeMatch[0];
    }
  }

  get type() {
    return this._type;
  }

  get mimeType() {
    return this._mimeType;
  }

  get copy() {
    return new FileItem(`${this.name} copy`, this.textContent, this.source);
  }
}

export enum DIRECTORY_TYPE {
  DEFAULT = "DEFAULT",
}

export class Directory extends Item {
  private _type: string;
  private _children: Map<string, Directory | FileItem>;

  constructor(
    name: string = "",
    type: DIRECTORY_TYPE = DIRECTORY_TYPE.DEFAULT
  ) {
    super(name || "un-named directory");

    this._type = DIRECTORY_TYPE[type] ? type : DIRECTORY_TYPE.DEFAULT;
    this._children = new Map();
  }

  get content() {
    return Array.from(this._children.values());
  }

  get type() {
    return this._type as DIRECTORY_TYPE;
  }

  get copy() {
    const dirCopy = new Directory(`${this.name} copy`, this.type);

    this.content.forEach((item) => {
      const itemCopy = item.copy;
      itemCopy.name = item.name;
      dirCopy.insertItem(itemCopy);
    });

    return dirCopy;
  }

  hasItem(itemName: string) {
    return this._children.has(itemName);
  }

  insertItem(item: Directory | FileItem) {
    if (this.hasItem(item.name)) return false;

    if (item === this) throw new Error("Directory cannot contain itself");

    let parent = this.parent;

    while (parent !== null) {
      if (parent === item) {
        throw new Error("Directory cannot contain one of its ancestors");
      }
      parent = parent.parent;
    }

    this._children.set(item.name, item);
    item.parent = this;

    return this.hasItem(item.name);
  }

  getItem(itemName: string) {
    return this._children.get(itemName) || null;
  }

  removeItem(itemName: string) {
    const item = this.getItem(itemName);

    if (item) {
      this._children.delete(itemName);
      item.parent = null;
    }

    return !this.hasItem(itemName);
  }
}

export class FileSystem {
  private _self = new Directory("root");
  private _currentDirectory = this._self;
  private _currentDirectoryPath = [this._currentDirectory]; // as stack
  // _currentUser = 'root';

  get currentDirectory() {
    return this._currentDirectory;
  }

  get currentDirectoryPath() {
    return this._currentDirectoryPath.map((dir) => `${dir.name}`);
  }

  get root() {
    return this._self;
  }

  get parent() {
    return null;
  }

  get name() {
    return this.root.name;
  }

  get copy() {
    const fsCopy = new FileSystem();

    this.root.content.forEach((item) => {
      const itemCopy = item.copy;
      itemCopy.name = item.name;
      fsCopy.insertItem(itemCopy);
    });

    return fsCopy;
  }

  get content() {
    return this.currentDirectory.content;
  }

  createFile(fileName: string, ...options: any[]) {
    const newFile = new FileItem(fileName, ...options);

    const inserted = this.insertItem(newFile);
    if (!inserted) {
      throw new Error(`File with name of "${fileName}" already exists`);
    }

    return newFile;
  }

  createDirectory(dirName: string, type = DIRECTORY_TYPE.DEFAULT) {
    const newDir = new Directory(dirName, type);

    const inserted = this.currentDirectory.insertItem(newDir);

    if (!inserted) {
      throw new Error(`Directory with name of "${dirName}" already exists`);
    }

    return newDir;
  }

  insertItem(item: Directory | FileItem) {
    return this.currentDirectory.insertItem(item);
  }

  getItem(itemName: string) {
    return this.currentDirectory.getItem(itemName);
  }

  hasItem(itemName: string) {
    return this.currentDirectory.hasItem(itemName);
  }

  removeItem(itemName: string) {
    return this.currentDirectory.removeItem(itemName);
  }

  renameItem(currentName: string, newName: string) {
    const item = this.getItem(currentName);

    if (item) {
      item.name = newName;
      this.removeItem(currentName);
      this.insertItem(item);
      return item;
    }

    return null;
  }

  copyItem(itemName: string) {
    const item = this.getItem(itemName);

    if (item) {
      const itemCopy = item.copy;
      this.insertItem(itemCopy);
      return itemCopy;
    }

    return null;
  }

  printCurrentDirectory() {
    console.log(
      `\n[${this.currentDirectoryPath.join("/")}]:` +
        (this.currentDirectory.content
          .map(
            (item) =>
              `\n[${item.constructor.name.substring(0, 1)}]-> ${item.name}`
          )
          .join("") || "\n(empty)")
    );
  }

  openDirectory(path: string) {
    if (!path) return null;

    let dir = this._getDirectoryFromPath(path);

    if (!(dir && dir instanceof Directory)) return null;

    const dirPath = [dir];
    let parent = dir.parent;

    while (parent) {
      dirPath.unshift(parent);
      parent = parent.parent;
    }

    this._currentDirectory = dir;
    this._currentDirectoryPath = dirPath;

    return dir;
  }

  goBack(steps = 1) {
    if (isNaN(steps) || steps <= 0 || steps >= this.currentDirectoryPath.length)
      return null;

    let dir = this.currentDirectory as Directory | null;
    let stepsMoved = steps;

    while (dir && stepsMoved > 0) {
      dir = dir.parent;
      stepsMoved -= 1;
    }

    if (dir && dir !== this.currentDirectory) {
      this._currentDirectory = dir;
      this._currentDirectoryPath = this._currentDirectoryPath.slice(
        0,
        this._currentDirectoryPath.length - (steps - stepsMoved)
      );
    }

    return dir;
  }

  goBackToDirectory(dirName: string) {
    const dirIndex = this.currentDirectoryPath.lastIndexOf(
      dirName,
      this.currentDirectoryPath.length - 2
    );

    if (dirIndex < 0) return null;

    const dir =
      dirIndex === 0 ? this.root : this._currentDirectoryPath[dirIndex];

    this._currentDirectory = dir;
    this._currentDirectoryPath = this._currentDirectoryPath.slice(
      0,
      dirIndex + 1
    );

    return dir;
  }

  findItem(
    itemNameOrValidatorFunc: string | Function,
    fromDirectory: Directory = this.root
  ) {
    return this.setupAndFind(itemNameOrValidatorFunc, fromDirectory);
  }

  findAllItems(
    itemNameOrValidatorFunc: string | Function,
    fromDirectory = this.root
  ) {
    return this.setupAndFind(itemNameOrValidatorFunc, fromDirectory, true);
  }

  moveItemTo(itemName: string, dirPath: string) {
    const item = this.getItem(itemName);

    if (item) {
      const dir = this._getDirectoryFromPath(dirPath);

      if (dir && dir instanceof Directory) {
        dir.insertItem(item);
        return dir;
      }
    }

    return null;
  }

  private setupAndFind = (
    itemNameOrValidatorFunc: string | Function,
    fromDirectory: Directory,
    multiple?: boolean
  ) => {
    if (typeof itemNameOrValidatorFunc === "function") {
      return this._findItem(itemNameOrValidatorFunc, fromDirectory, multiple);
    }

    const func = (item: Directory | FileItem) =>
      item.name === itemNameOrValidatorFunc;
    return this._findItem(func, fromDirectory, multiple);
  };

  private _findItem = (
    isItem: Function,
    dir: Directory,
    multiple: boolean = false
  ) => {
    let match: any = multiple ? [] : null;
    let directories = [];

    for (const item of dir.content) {
      if (isItem(item)) {
        if (multiple) {
          match?.push(item);
        } else {
          match = item;
          break;
        }
      }

      if (item instanceof Directory) {
        directories.push(item);
      }
    }

    if ((match === null || multiple) && directories.length) {
      for (const subDir of directories) {
        const found = this._findItem(isItem, subDir, multiple);
        if (multiple) {
          match.push(...found);
        } else if (found) {
          match = found;
          break;
        }
      }
    }

    return match;
  };

  private _getDirectoryFromPath = (dirPath: string) => {
    if (dirPath.match(/^(root\/?|\/)$/g)) {
      return this.root;
    }

    if (dirPath.match(/^\.\/?$/g)) {
      return this.currentDirectory;
    }

    let dir = dirPath.match(/^(root\/?|\/)/g)
      ? this.root
      : this.currentDirectory;
    const paths = dirPath.replace(/^(root\/|\.\/|\/)/g, "").split("/");

    while (paths.length) {
      dir = dir.getItem(paths.shift() as string) as Directory;

      if (!dir || !(dir instanceof Directory)) {
        return null;
      }
    }

    if (paths.length === 0) {
      return dir;
    }

    return null;
  };
}
