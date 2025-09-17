-- Clear existing data
DELETE FROM "Drink";
DELETE FROM "PhotoCredit";

-- Insert PhotoCredits
INSERT INTO "PhotoCredit" (id, photographer, photographerUrl, originalPhotoUrl) VALUES 
(1, 'Adam Jaime', 'https://unsplash.com/@adamjaime', 'https://unsplash.com/photos/dmkmrNptMpw'),
(2, 'Kobby Mendez', 'https://unsplash.com/@kobbymendez', 'https://unsplash.com/photos/xBFTjrMIC0c'),
(3, 'Mae Mu', 'https://unsplash.com/@picoftasty', 'https://unsplash.com/photos/TkzdkVn1AyA'),
(4, 'Kevin Kelly', 'https://unsplash.com/@kevintphotography', 'https://unsplash.com/photos/rBXHBpk_bg8'),
(5, 'Ambitious Creative Co', 'https://unsplash.com/@ambitiousco', 'https://unsplash.com/photos/Rick_Gush'),
(6, 'Stanislav Ivanitskiy', 'https://unsplash.com/@ivanitskiy', 'https://unsplash.com/photos/yCVgn4hP0Oo'),
(7, 'Michal Balog', 'https://unsplash.com/@michalbalog', 'https://unsplash.com/photos/QE2g1QZqMyM'),
(8, 'Ash Edmonds', 'https://unsplash.com/@badashproducts', 'https://unsplash.com/photos/Koxa-GX_5zs'),
(9, 'Giovanna Gomes', 'https://unsplash.com/@giovannagomes', 'https://unsplash.com/photos/_8KV86shhPo'),
(10, 'Dylan de Jonge', 'https://unsplash.com/@dylandej', 'https://unsplash.com/photos/pe9T1lzjkZs'),
(11, 'Elevate', 'https://unsplash.com/@elevatebeer', 'https://unsplash.com/photos/nYgy58eb9aw'),
(12, 'Jarek Ceborski', 'https://unsplash.com/@jarekceb', 'https://unsplash.com/photos/jn7uVeCdf6U'),
(13, 'Henrique Felix', 'https://unsplash.com/@henriqueflix', 'https://unsplash.com/photos/uGak0_44WAI'),
(14, 'Adam Wilson', 'https://unsplash.com/@fourcolourblack', 'https://unsplash.com/photos/6UIonphZA5o'),
(15, 'Kym Ellis', 'https://unsplash.com/@kymellis', 'https://unsplash.com/photos/K4mSJ7kc0As'),
(16, 'Hermes Rivera', 'https://unsplash.com/@hermez777', 'https://unsplash.com/photos/ahHn7hbCj9g'),
(17, 'Neha Deshmukh', 'https://unsplash.com/@nehad123', 'https://unsplash.com/photos/E4g3qXch8xw'),
(18, 'Ambitious Creative Co', 'https://unsplash.com/@ambitiousco', 'https://unsplash.com/photos/Rick_Gush'),
(19, 'Adam Jaime', 'https://unsplash.com/@adamjaime', 'https://unsplash.com/photos/dmkmrNptMpw'),
(20, 'Stanislav Ivanitskiy', 'https://unsplash.com/@ivanitskiy', 'https://unsplash.com/photos/yCVgn4hP0Oo');

-- Insert Drinks
INSERT INTO "Drink" (name, description, price, image, category, ingredients, abv, isPopular, photoCreditId) VALUES 
('Old Fashioned', 'A classic whiskey cocktail with sugar, bitters, and orange peel', 14.00, 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&h=600&fit=crop', 'COCKTAIL', 'Whiskey, Sugar, Bitters, Orange Peel', 35.0, 1, 1),
('Manhattan', 'A sophisticated blend of whiskey, vermouth, and bitters', 15.00, 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop', 'COCKTAIL', 'Rye Whiskey, Sweet Vermouth, Angostura Bitters, Cherry', 32.0, 1, 2),
('Negroni', 'Equal parts gin, Campari, and sweet vermouth', 13.00, 'https://images.unsplash.com/photo-1544145945-7a33c79b1be8?w=800&h=600&fit=crop', 'COCKTAIL', 'Gin, Campari, Sweet Vermouth, Orange Peel', 28.0, 1, 3),
('Martini', 'The quintessential gin cocktail with dry vermouth', 16.00, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop', 'COCKTAIL', 'Gin, Dry Vermouth, Olive or Lemon Twist', 38.0, 1, 4),
('Margarita', 'Tequila, lime juice, and triple sec served with salt rim', 12.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop', 'COCKTAIL', 'Tequila, Lime Juice, Triple Sec, Salt', 22.0, 1, 5),
('Whiskey Sour', 'Whiskey, lemon juice, and simple syrup with egg white foam', 13.00, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop', 'COCKTAIL', 'Whiskey, Lemon Juice, Simple Syrup, Egg White', 25.0, 1, 6),
('Moscow Mule', 'Vodka, ginger beer, and lime in a copper mug', 11.00, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop', 'COCKTAIL', 'Vodka, Ginger Beer, Lime Juice', 12.0, 1, 7),
('Daiquiri', 'Simple rum cocktail with lime juice and sugar', 10.00, 'https://images.unsplash.com/photo-1544145945-7a33c79b1be8?w=800&h=600&fit=crop', 'COCKTAIL', 'White Rum, Lime Juice, Simple Syrup', 28.0, 0, 8),
('Mojito', 'Refreshing rum cocktail with mint, lime, and soda water', 12.00, 'https://images.unsplash.com/photo-1544145945-7a33c79b1be8?w=800&h=600&fit=crop', 'COCKTAIL', 'White Rum, Mint, Lime, Sugar, Soda Water', 13.0, 1, 9),
('Gin & Tonic', 'Classic highball with gin, tonic water, and lime', 9.00, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop', 'COCKTAIL', 'Gin, Tonic Water, Lime', 11.0, 1, 10),
('IPA', 'Hoppy India Pale Ale with citrus and pine notes', 7.00, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop', 'BEER', 'Hops, Malt, Yeast, Water', 6.2, 1, 11),
('Lager', 'Crisp and clean bottom-fermented beer', 5.00, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop', 'BEER', 'Pilsner Malt, Noble Hops, Lager Yeast, Water', 4.8, 1, 12),
('Wheat Beer', 'Smooth and cloudy beer made with wheat', 6.00, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop', 'BEER', 'Wheat, Barley Malt, Hops, Yeast', 5.1, 0, 13),
('Stout', 'Rich, dark beer with roasted malt flavors', 6.50, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&h=600&fit=crop', 'BEER', 'Roasted Malt, Hops, Yeast, Water', 5.8, 1, 14),
('Cabernet Sauvignon', 'Full-bodied red wine with blackcurrant and oak notes', 12.00, 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&h=600&fit=crop', 'WINE', 'Cabernet Sauvignon Grapes', 13.5, 1, 15),
('Chardonnay', 'Crisp white wine with apple and citrus flavors', 10.00, 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&h=600&fit=crop', 'WINE', 'Chardonnay Grapes', 12.5, 1, 16),
('Pinot Noir', 'Light to medium-bodied red with cherry and earth notes', 14.00, 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&h=600&fit=crop', 'WINE', 'Pinot Noir Grapes', 12.8, 0, 17),
('Single Malt Scotch', 'Aged Scottish whisky from a single distillery', 18.00, 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop', 'SPIRIT', 'Malted Barley, Water, Yeast', 43.0, 1, 18),
('Vodka', 'Clean, neutral spirit perfect for mixing', 8.00, 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop', 'SPIRIT', 'Grain or Potato, Water', 40.0, 1, 19),
('Tequila Blanco', 'Unaged tequila with bright agave flavors', 10.00, 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&h=600&fit=crop', 'SPIRIT', 'Blue Agave', 38.0, 0, 20);