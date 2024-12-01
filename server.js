                const express = require('express');
                const fs = require('fs');
                const path = require('path');
                const app = express();
                const port = 22;

                // إعداد static files
                app.use(express.static(path.join(__dirname, 'public')));

                // إعداد API لاسترجاع السجلات
                app.get('/logs', (req, res) => {
                    fs.readFile('./logs/logs.json', 'utf8', (err, data) => {
                        if (err) {
                            res.status(500).send('Error reading log file');
                            return;
                        }
                        res.json(JSON.parse(data));
                    });
                });

                // بدء الخادم
                app.listen(port, () => {
                    console.log(`Server running at http://localhost:${port}`);
                });
