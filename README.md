## Random coordinates

Clone project: 
```cmd
git clone https://github.com/git-antonyuk/coordinates.git
cd ./coordinates
```

### Server
node.js version:  v16.15.0
```cmd
node --version // v16.15.0
```

> Dev mode: 
```cmd
cd ./server
yarn install // if deps not installed
yarn run dev
```

### Client

Before start, add your MAPBOX client api key
```cmd
cd ./client/
mv env.sample.js env.js // rename file
```
After renaming add key to file, key is `MAPBOX_APU_KEY`

> Dev mode: 
```cmd
cd ./client
yarn install // if deps not installed
yarn run dev
```
