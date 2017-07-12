# doubling-cube

Work-in-progress collectible card game draft client.  Intended to patch holes in existing implementations while giving me a vector to learn React+Redux.

Target architecture is a fluid, reactive draft client communicating with an Express/Mongo backend using websockets to link the distributed clients across X drafters to the draft-state-maintaining backend. 

Redux will be for easy-to-maintain state management between multiple client components in the Draft HUD and the server itself.  Plan to use Observables to make the UX a bit less web-y and more game-y (left and right click simultaneous mouse actions, drag and drop cards into your pool, etc.)

