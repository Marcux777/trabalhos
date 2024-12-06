class Pizza {
    size: string = "";
    dough: string = "";
    toppings: string[] = [];
  
    display(): void {
      console.log(`Pizza: ${this.size}, ${this.dough}, Toppings: ${this.toppings.join(", ")}`);
    }
  }

  interface PizzaBuilder {
    reset(): this;
    setSize(size: string): this;
    setDough(dough: string): this;
    addTopping(topping: string): this;
    getResult(): Pizza;
  }
  class MargheritaPizzaBuilder implements PizzaBuilder {
    private pizza: Pizza;
  
    constructor() {
      this.pizza = new Pizza();
    }
  
    reset(): this {
      this.pizza = new Pizza();
      return this;
    }
  
    setSize(size: string): this {
      this.pizza.size = size;
      return this;
    }
  
    setDough(dough: string): this {
      this.pizza.dough = dough;
      return this;
    }
  
    addTopping(topping: string): this {
      this.pizza.toppings.push(topping);
      return this;
    }
  
    getResult(): Pizza {
      return this.pizza;
    }
  }
  
  class PepperoniPizzaBuilder implements PizzaBuilder {
    private pizza: Pizza;
  
    constructor() {
      this.pizza = new Pizza();
    }
  
    reset(): this {
      this.pizza = new Pizza();
      return this;
    }
  
    setSize(size: string): this {
      this.pizza.size = size;
      return this;
    }
  
    setDough(dough: string): this {
      this.pizza.dough = dough;
      return this;
    }
  
    addTopping(topping: string): this {
      this.pizza.toppings.push(topping);
      return this;
    }
  
    getResult(): Pizza {
      return this.pizza;
    }
  }
  class PizzaDirector {
    private builder: PizzaBuilder;
  
    constructor(builder: PizzaBuilder) {
      this.builder = builder;
    }
  
    setBuilder(builder: PizzaBuilder): void {
      this.builder = builder;
    }
  
    makeMargherita(): Pizza {
      return this.builder.reset()
        .setSize("grande")
        .setDough("fina")
        .addTopping("Queijo")
        .addTopping("Tomate")
        .addTopping("Manjericão")
        .getResult();
    }
  
    makePepperoni(): Pizza {
      return this.builder.reset()
        .setSize("média")
        .setDough("tradicional")
        .addTopping("Queijo")
        .addTopping("Pepperoni")
        .getResult();
    }
  }
// Usando o Diretor para criar pizzas predefinidas
const margheritaBuilder = new MargheritaPizzaBuilder();
const pepperoniBuilder = new PepperoniPizzaBuilder();
const director = new PizzaDirector(margheritaBuilder);

const margheritaPizza = director.makeMargherita();
margheritaPizza.display();

director.setBuilder(pepperoniBuilder);
const pepperoniPizza = director.makePepperoni();
pepperoniPizza.display();

// Criando uma pizza personalizada diretamente com o Builder
const customPizzaBuilder = new MargheritaPizzaBuilder();
const customPizza = customPizzaBuilder.reset()
  .setSize("pequena")
  .setDough("recheada")
  .addTopping("Queijo")
  .addTopping("Frango")
  .addTopping("Milho")
  .getResult();

customPizza.display();
      