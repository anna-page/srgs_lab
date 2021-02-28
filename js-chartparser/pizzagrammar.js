//
//  pizzagrammar.js
//
/*
  The author or authors of this code dedicate any and all 
  copyright interest in this code to the public domain.
*/


//////////////////////////////////////////////////////////////////////
// a traditional pizza grammar

grammar = new Grammar('order');
                    
grammar.order = [['I', 'would', 'like', 'a'], Ref('drink'), Tag("out.drink = new Object(); out.drink.liquid=rules.drink.type; out.drink.drinksize=rules.drink.drinksize;"), 'and', Ref('pizza'), Tag("out.pizza = rules.pizza")];

grammar.kindofdrink = [OneOf([
              [["coke"], Tag("out='coke'")],
			  [["pepsi"], Tag("out='pepsi'")],
			  [["coca","cola"], Tag("out='coke'")]])];

grammar.foodsize = [Tag("out = 'medium';"),
		    Repeat(0, 1, [OneOf([
		             ['small', Tag("out = 'small';")],
					 ['medium'],
					 ['regular', Tag("out = 'medium';")],
					 ['large', Tag("out = 'large';")]])])];

grammar.tops = [Tag("out = new Array;"),
                    Ref("top"), 
                    Tag("out.push(rules.top);"),
		            Repeat(0, Infinity, ["and", Ref("top"), 
					 Tag("out.push(rules.top)")])];

grammar.top = [OneOf([
              ["anchovies", Tag("out='anchovies'")],
			  ["pepperoni", Tag("out='pepperoni'")],
			  ["mushroom", Tag("out='mushrooms'")],
			  ["mushrooms", Tag("out='mushrooms'")]])];
	  					 
grammar.drink = [Ref("foodsize"), Ref("kindofdrink"), Tag("out.drinksize=rules.foodsize; out.type=rules.kindofdrink;")];

grammar.pizza = [Ref("number"), Ref("foodsize"), Tag("out.pizzasize=rules.foodsize; out.number=rules.number;"), OneOf([["pizza"], ["pizzas"]]), "with", Ref("tops"), Tag("out.topping = rules.tops")];

grammar.number = [OneOf([["a", Tag("out=1")],
			 ["one", Tag("out=1")],
			 ["two", Tag("out=2")],
			 ["three", Tag("out=3")]])];

grammar.$check();


//////////////////////////////////////////////////////////////////////
// a left-corner filter for the above grammar
// NOTE: empty categories (iwant and foodsize) must also include the 
// words that can follow after the category

filter = {};

filter.utterance = filter.iwant = WordSet('I give a one two three');

filter.order = filter.drink = filter.pizza = filter.number = WordSet('a one two three');

filter.kindofdrink = WordSet('coke cokes coca pepsi pepsis');
filter.cokeword = WordSet('coke cokes coca');
filter.pepsiword = WordSet('pepsi pepsis');

filter.foodsize = WordSet('small medium regular large coke cokes coca pepsi pepsis pizza pizzas');

filter.tops = filter.top = WordSet('anchovies pepperoni mushroom mushrooms');
