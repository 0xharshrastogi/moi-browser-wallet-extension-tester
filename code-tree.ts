import { readdir, stat } from "node:fs/promises";
import { basename, resolve } from "node:path";

interface File {
    path: string;
}

interface Directory {
    root: string;
    children: (File | Directory)[];
}

type FileTree = File | Directory;

const getFileTree = async (path: string, depth = 0): Promise<string> => {
    const stats = await stat(path);

    if (stats.isFile()) {
        const name = basename(path);
        return name;
    }

    if (!stats.isDirectory()) {
        return "";
    }

    let dir = basename(resolve(path)) + "/";
    for (const item of await readdir(path)) {
        dir +=
            "\n" +
            " ".repeat(depth + 1) +
            "├" +
            "--" +
            (await getFileTree(path + "/" + item, depth + 2));
    }

    return dir;
};

console.log(await getFileTree("../voyage-passport"));
