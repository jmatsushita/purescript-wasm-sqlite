import { main } from "../output/test.js";

// const toplevelawait = await (async () => {});

// toplevelawait();
mocha.setup("bdd");
main();
mocha.run();
