import React, { useState } from 'react';
import { Card, CardContent, Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function Shop() {
    const [products] = useState([
        { 
            id: 1, 
            name: 'T-shirt', 
            price: 19.99, 
            image: 'T-shirt.png', 
            description: 'Soft and comfy cotton tee', 
            category: 'Clothing' 
          },
          { 
            id: 2, 
            name: 'Hat', 
            price: 9.99, 
            image: 'hat.png', 
            description: 'Stylish cap to keep you cool', 
            category: 'Accessories' 
          },
          { 
            id: 3, 
            name: 'Shoes', 
            price: 49.99, 
            image: 'shoe.png', 
            description: 'Lightweight sneakers for daily wear', 
            category: 'Shoes' 
          },
          { 
            id: 4, 
            name: 'Sunglasses', 
            price: 29.99, 
            image: 'sunglasses.png', 
            description: 'Trendy sunglasses for sunny days', 
            category: 'Accessories' 
          },
          { 
            id: 5, 
            name: 'Jacket', 
            price: 89.99, 
            image: 'jacket.png', 
            description: 'Warm jacket for chilly weather', 
            category: 'Clothing' 
          },
          { 
            id: 6, 
            name: 'Watch', 
            price: 199.99, 
            image: 'watch.png', 
            description: 'Elegant watch with a modern design', 
            category: 'Accessories' 
          }
    
    ]);
      

  const [cart, setCart] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // <-- 新增：搜索关键字
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);


// 提取所有唯一分类（含“All”）
const categories = ['All', ...new Set(products.map(p => p.category))];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your Shopping Cart is Empty！');
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };
  

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || favorites.includes(product.id);
    return matchesSearch && matchesCategory && matchesFavorite;
  });
  
  

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Simple Shop
      </Typography>

      {/* 搜索栏 */}
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ margin: '1rem 0' }}>
     

{/* 👇 然后分类按钮可以 map */}
{categories.map((cat) => (
  <Button
    key={cat}
    variant={selectedCategory === cat ? 'contained' : 'outlined'}
    onClick={() => setSelectedCategory(cat)}
    style={{ margin: '0.25rem' }}
  >
    {cat}
  </Button>
))}
💡 <Button
  variant={showFavoritesOnly ? 'contained' : 'outlined'}
  color="secondary"
  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}

>
{showFavoritesOnly ? 'View All Products' : 'Show Favorites 💖'}

</Button>






</div>



      <Typography variant="h6" gutterBottom>
        Cart: {cart.length} item{cart.length !== 1 && 's'} - Total: ${calculateTotal()}
      </Typography>
      
      <Grid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ position: 'relative' }}>
  {/* 分类标签 */}
  <div style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  }}>
    {product.category}
  </div>

  {/* 收藏按钮 */}
  <div 
    style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: favorites.includes(product.id) ? 'hotpink' : 'lightgray',
    }}
    onClick={() => toggleFavorite(product.id)}
    title={favorites.includes(product.id) ? 'Unfavorite' : 'Favorite'}
  >
    {favorites.includes(product.id) ? '💖' : '🤍'}
  </div>

  <img 
    src={product.image} 
    alt={product.name} 
    style={{ 
      width: '300px', 
      height: '300px',
      objectFit: 'cover' 
    }} 
  />

  <CardContent>
    <Typography variant="h5">{product.name}</Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      {product.description}
    </Typography>
    <Typography variant="body2">${product.price}</Typography>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={() => addToCart(product)} 
      fullWidth
    >
      Add to Cart
    </Button>
  </CardContent>
</Card>

            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ margin: '1rem' }}>
            No products found.
          </Typography>
        )}
      </Grid>
      
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleCheckout} 
        style={{ marginTop: '2rem' }}
        fullWidth
      >
        Checkout
      </Button>

      {/* Checkout Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Your Items:</Typography>
          {cart.length === 0 ? (
            <Typography variant="body1">No items in your cart.</Typography>
          ) : (
            cart.map((item, index) => (
              <Typography key={index} variant="body1">
                {item.name} - ${item.price}
              </Typography>
            ))
          )}
          <Typography variant="h6" style={{ marginTop: '1rem' }}>
            Total: ${calculateTotal()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Shop;
