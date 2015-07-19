//Contains the full list of route names
export class Route {

    constructor(public name: string) {
    }

    toString() {
        return this.name;
    }

    static LIST = new Route('list');
}
