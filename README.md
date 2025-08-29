# 🍽️ Alquiler de Vajillas Esperanza

Web-based tableware and furniture rental management system for events. Application developed with pure HTML, CSS, and JavaScript featuring tab navigation and WhatsApp quotation system.

## 📋 Project Description

**Alquiler de Vajillas Esperanza** is a web application that allows customers to:
- Explore the complete product catalog organized by categories
- Select quantities of products for rental
- Generate automatic quotations
- Request budgets directly through WhatsApp

### 🏗️ Project Architecture

```
alquiler-vajillas/
├── index.html              # Main page
├── styles.css              # Project CSS styles
├── script.js               # JavaScript functionality
├── vajillas-catalogo.csv   # Product database (44 products)
├── categories/             # Category HTML files
│   ├── mobiliario.html     # Furniture & textiles (16 products)
│   ├── vajilla.html        # Tableware & cutlery (8 products)
│   ├── copas.html          # Cups & glassware (8 products)
│   └── accesorios.html     # Accessories & service (13 products)
└── README.md               # This file
```

## 🚀 Key Features

- **📱 Responsive Design**: Modern interface with gradients and animations
- **🗂️ Tab Navigation**: 4 logically organized categories
- **🔢 State Management**: Counters persist when switching between tabs
- **💰 Automatic Calculation**: Prices and totals update dynamically
- **📲 WhatsApp Integration**: Direct quotation sending
- **📊 CSV Catalog**: Easy product and price updates

### 🛍️ Product Catalog

| Category | Quantity | Price Range | Featured Items |
|----------|----------|-------------|----------------|
| 🪑 **Furniture & Textiles** | 16 products | $180 - $4,500 | Imperial Table, Tablecloths |
| 🍽️ **Tableware & Cutlery** | 8 products | $180 - $850 | Verbano Plates, Cutlery Sets |
| 🍷 **Cups & Glassware** | 8 products | $225 - $950 | GIN Glass, Glass Pitcher |
| 🍯 **Accessories & Service** | 13 products | $350 - $1,200 | Trays, Salad Bowls |

**Total: 44 products** | **Complete range: $180 - $4,500**

## 🔧 Installation and Setup

### Prerequisites
- Python 3.x installed on the system
- Modern web browser (Chrome, Firefox, Safari, Edge)

### ⬇️ Download the Project

```bash
# Clone or download the repository
git clone [REPOSITORY_URL]
cd alquiler-vajillas

# Or unzip if you downloaded a ZIP file
unzip alquiler-vajillas.zip
cd alquiler-vajillas
```

## 🌐 Running the Project

### 1. Start Local Server

```bash
# From the project root folder
python3 -m http.server 8000
```

**Expected output:**
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

### 2. Access the Application

Open your browser and go to:
```
http://localhost:8000
```

### 3. ✅ Verify Functionality

The application should display:
- ✅ Header with "🍽️ Alquiler de Vajillas Esperanza"
- ✅ 4 navigation tabs with icons
- ✅ Products with functional counters
- ✅ Quotation system at the bottom

## 🛑 Stopping the Project

### Method 1: Active Terminal
If the server was run in the current terminal:
```bash
Ctrl + C
```

### Method 2: Background Process
If the server is running in background:

```bash
# Find the process
lsof -i:8000

# Kill the specific process
kill [PID]

# Or force close by port
lsof -ti:8000 | xargs kill -9
```

### Method 3: Direct Command
```bash
# Kill all Python HTTP servers
pkill -f "python3 -m http.server"
```

## 🔍 Verification and Troubleshooting

### ✅ Check if Server is Running

```bash
# Check specific port
lsof -i:8000

# View related processes
ps aux | grep "python3 -m http.server"
```

**If NO output** = Server stopped ✅  
**If output present** = Server running 🟡

### 🚨 Common Problems and Solutions

#### Problem 1: Port 8000 in use
```bash
# Error: Address already in use
# Solution: Use different port
python3 -m http.server 8080
```

#### Problem 2: Cannot stop server
```bash
# Force close
sudo lsof -ti:8000 | xargs sudo kill -9

# Alternative with killall
sudo killall python3
```

#### Problem 3: Page doesn't load correctly
- ✅ Verify all files are in the correct folder
- ✅ Check read permissions: `chmod +r *.html *.css *.js`
- ✅ Clear browser cache: `Ctrl + F5`

#### Problem 4: JavaScript not working
- ✅ Open Developer Console (F12)
- ✅ Check errors in "Console" tab
- ✅ Confirm `script.js` loads correctly

## 🔧 Development and Customization

### Update Products
1. **Edit `vajillas-catalogo.csv`** with new products
2. **Update `script.js`** in the `products` section
3. **Modify HTML files** in `categories/`

### Customize Styles
- **Colors**: Edit gradients in `styles.css`
- **Typography**: Change fonts in the `body` section
- **Animations**: Modify `transition` and `transform`

### Configure WhatsApp
In `script.js` line ~155:
```javascript
let whatsappUrl = `https://api.whatsapp.com/send?phone=5493496578677&text=${encodeURIComponent(message)}`;
```

## 📊 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Server**: Python HTTP Server
- **Data**: CSV for product catalog
- **Integration**: WhatsApp Business API

## 🎯 Use Cases

This application is perfect for:
- **Event rental businesses** - Complete inventory management
- **Wedding planners** - Quick quotation generation
- **Catering services** - Equipment rental tracking
- **Small businesses** - Digital catalog presentation

## 🚀 Performance Features

- **⚡ Fast Loading**: Lightweight, no external dependencies
- **🔄 State Persistence**: Shopping cart maintains state across tabs
- **📱 Mobile Optimized**: Responsive design for all devices
- **🌐 Offline Ready**: Works without internet after initial load

## 📞 Contact and Support

- **WhatsApp**: +54 9 349 657-8677
- **Business Type**: Tableware and furniture rental for events

## 📝 Additional Notes

- Application works completely offline once loaded
- No external database required
- Compatible with all modern browsers
- Optimized for both mobile and desktop devices

## 🔄 Quick Reference Commands

```bash
# Start project
python3 -m http.server 8000

# Check status
lsof -i:8000

# Stop project
lsof -ti:8000 | xargs kill

# Access application
http://localhost:8000
```

## 📈 Future Enhancements

Potential improvements for future versions:
- **🔐 User Authentication**: Customer login system
- **💾 Database Integration**: MySQL/PostgreSQL support
- **📧 Email Notifications**: Automatic booking confirmations
- **📊 Analytics Dashboard**: Rental statistics and reports
- **🎨 Theme Customization**: Multiple color schemes
- **🌍 Multi-language**: Spanish/English toggle

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

**Developed for Alquiler de Vajillas Esperanza** 🍽️  
*Tableware and furniture rental management system for events*

**Made with ❤️ using vanilla JavaScript, CSS3, and HTML5**