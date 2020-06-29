//NPM COMMANDS TO RUN
// npm install --save-dev gulp autoprefixer cssnano gulp-replace gulp-concat gulp-postcss gulp-sass gulp-sourcemaps gulp-terser gulp-imagemin gulp-purgecss gulp-babel @babel/core @babel/preset-env gulp-rev gulp-rev-collector del

//Initialize modules
const { src, dest, task, watch, parallel, series } = require('gulp');

const autoprefixer = require('autoprefixer'); // Autoprefixes CSS for older browsers
const cssnano = require('cssnano'); // Minifies CSS
const concat = require('gulp-concat'); // Concatenates files. For JS files, you need to toggle it the 'js' task
const postcss = require('gulp-postcss'); // 
const sass = require('gulp-sass'); // Converts SASS to CSS
const sourcemaps = require('gulp-sourcemaps'); // Creates maps for CSS and JS
const terser = require('gulp-terser'); // Minifies JS
const imagemin = require('gulp-imagemin'); // Minifies Images
const purgecss = require('gulp-purgecss'); // Removes Unnecessary CSS. Needs to be called separately
const babel = require('gulp-babel'); // Converts ES6 syntax to older

// These modules help create the hashed files, populate the rev-manifest.json, and insert the file names to the .hbs files
const rev = require('gulp-rev'); // Creates the Hashed files and populates rev-manifest.json
const collect = require('gulp-rev-collector'); //Populates the files with the new URLs taken from manifest.json
const del = require('del'); //Deletes files from a folder


// Source file paths
const srcFile = {
    templates: 'src/views/**/*.hbs',
    // templates: 'src/**/*.html',
    css: 'src/css/*.css',
    scss: 'src/scss/**/*.scss',
    vendorSCSS: 'src/scss/0-vendor/vendor.scss',
    js: 'src/js/*.js',
    vendorJS: 'src/js/vendor/*.js',
    img: 'src/img/**/*',
    font: 'src/fonts/**/*'
};

// Output directories
const public = {
    css: 'public/css',
    vendorCSS: 'public/css/vendor',
    js: 'public/js',
    vendorJS: 'public/js/vendor',
    img: 'public/img',
    font: 'public/fonts'
};

// Logs Message
task('message', done => {
    console.log('Gulp is running...');
    done();
});

// SCSS Task
task('scss', done => {

    // del.sync('./public/css/*.{css,css.map}'); // Deletes all the CSS files and respective CSS maps from the public/css folder

    src(srcFile.scss)
        .pipe(sourcemaps.init()) // Maps CSS files back to the original SASS files
        .pipe(sass().on('error', sass.logError)) // Complies SASS to CSS files and logs errors if there any
        .pipe(
            postcss([
                autoprefixer({
                    //Autoprefixes CSS
                    overrideBrowserslist: ['last 3 versions'],
                    cascade: false,
                }),
                cssnano(), //Minifies CSS Files
            ])
        )
        
        // .pipe(rev()) //Creates the hashed CSS files
        .pipe(sourcemaps.write('.')) //Writes CSS Map files in the same output folder
        
        .pipe(dest(public.css)) //Outputs the files in the public/css folder
        // .pipe(rev.manifest('rev-manifest.json', { base: process.cwd() + '.', merge: true })) //Populates the rev-manifest.json file with the newly created files
        // .pipe(dest('.')); //Outputs the rev-manifest.json file in the main folder

        // //Static asset revision data collector from manifests, generated from different streams, and replace their links in html template.
        // setTimeout(() => {
        //      src(['rev-manifest.json', 'src/**/*.{hbs,html}']) // Updates the templates with the correct URLs of the hashed files
        //          .pipe(
        //              collect({
        //                  replaceReved: true,
        //              })
        //          )
        //          .pipe(dest('src/')); //Templates in the src/ folder

        //      src(['rev-manifest.json', 'public/**/*.{json,css,js}']) //Updates the generated asset files with the hashed versions of the URLs that they contain inside of them 
        //          .pipe(
        //              collect({
        //                  replaceReved: true,
        //              })
        //          )
        //          .pipe(dest('public/')); // Actual public files that are used in production
        // }, 500);
           
    done();
});

// vendorSCSS task
task('vendorSCSS', done =>{

    // del.sync('./public/css/vendor/*.{css,css.map}');// Deletes all the CSS files in the public/css/vendor folder

    src(srcFile.vendorSCSS)
        .pipe(sourcemaps.init()) // Maps CSS files back to the original SASS files
        .pipe(sass().on('error', sass.logError)) // Complies SASS to CSS files and logs errors if there any
        .pipe(
            postcss([
                autoprefixer({
                    //Autoprefixes CSS
                    overrideBrowserslist: ['last 3 versions'],
                    cascade: false,
                }),
                cssnano(), //Minifies CSS Files
            ])
        )
        // .pipe(rev()) //Creates the hashed CSS files
        .pipe(sourcemaps.write('.')) //Writes CSS Map files in the same output folder
        .pipe(dest(public.vendorCSS)) //Outputs the files in the public/css/vendor folder
    //     .pipe(rev.manifest('rev-manifest.json', { base: process.cwd() + '.', merge: true })) //Populates the rev-manifest.json file with the newly created files
    //     .pipe(dest('.')); //Outputs the rev-manifest.json file in the main folder

    // //Static asset revision data collector from manifests, generated from different streams, and replace their links in html template.
    // setTimeout(() => {
    //     src(['rev-manifest.json', 'src/**/*.{hbs,html}']) // Updates the templates with the correct URLs of the hashed files
    //         .pipe(
    //             collect({
    //                 replaceReved: true,
    //             })
    //         )
    //         .pipe(dest('src/')); //Templates in the src/ folder

    //     src(['rev-manifest.json', 'public/**/*.{json,css,js}']) //Updates the generated asset files with the hashed versions of the URLs that they contain inside of them
    //         .pipe(
    //             collect({
    //                 replaceReved: true,
    //             })
    //         )
    //         .pipe(dest('public/')); // Actual public files that are used in production
    // }, 1000); // Longer time because it's usually a larger file

    done();
})

// JS task (concatenates and minifies javascript)
task('js', done => {

    // del.sync('./public/js/*.{js,js.map}');// Deletes all the JS files and respective JS maps from the public/js folder

    src(srcFile.js)
        .pipe(sourcemaps.init()) //Creates the source map of the JS file
        .pipe(
            babel({
                // Transcribes the ES6 syntax to older
                presets: ['@babel/env'],
            })
        )
        .pipe(terser()) //This minifies the JS files
        // .pipe(concat('main.js')) //Toggle this if you don't want JS files to be concatenated
        // .pipe(rev()) //Creates the hashed JS files
        .pipe(sourcemaps.write('.')) //Writes JS Map files in the same output folder
        .pipe(dest(public.js)) //Outputs the files in the public/js folder
        // .pipe(rev.manifest('rev-manifest.json', { base: process.cwd() + '.', merge: true }))//Populates the rev-manifest.json file with the newly created files
        // .pipe(dest('.')); //Outputs the rev-manifest.json file in the main folder

        // //Static asset revision data collector from manifests, generated from different streams, and replace their links in html template.
        // setTimeout(() => {
        //      src(['rev-manifest.json', 'src/**/*.{hbs,html}']) // Updates the templates with the correct URLs of the hashed files
        //          .pipe(
        //              collect({
        //                  replaceReved: true,
        //              })
        //          )
        //          .pipe(dest('src/')); //Templates in the src/ folder

        //      src(['rev-manifest.json', 'public/**/*.{json,css,js}']) //Updates the generated asset files with the hashed versions of the URLs that they contain inside of them
        //          .pipe(
        //              collect({
        //                  replaceReved: true,
        //              })
        //          )
        //          .pipe(dest('public/'));// Actual public files that are used in production
        // }, 500);

    done();
});

// vendorJS
task('vendorJS', done =>{

    // del.sync('./public/js/vendor/*.js');// Deletes all the JS files and respective JS maps from the public/js folder

    src(srcFile.vendorJS)
        .pipe(concat('vendor.js')) // Concatenates all files by the stated order into vendor.js
        // .pipe(rev()) //Creates the hashed JS files
        .pipe(dest(public.vendorJS)) //Outputs the files in the public/js folder
        // .pipe(rev.manifest('rev-manifest.json', { base: process.cwd() + '.', merge: true })) //Populates the rev-manifest.json file with the newly created files
        // .pipe(dest('.')); //Outputs the rev-manifest.json file in the main folder

    // //Static asset revision data collector from manifests, generated from different streams, and replace their links in html template.
    // setTimeout(() => {
    //     src(['rev-manifest.json', 'src/**/*.{hbs,html}']) // Updates the templates with the correct URLs of the hashed files
    //         .pipe(
    //             collect({
    //                 replaceReved: true,
    //             })
    //         )
    //         .pipe(dest('src/')); //Templates in the src/ folder

    //     src(['rev-manifest.json', 'public/**/*.{json,css,js}']) //Updates the generated asset files with the hashed versions of the URLs that they contain inside of them
    //         .pipe(
    //             collect({
    //                 replaceReved: true,
    //             })
    //         )
    //         .pipe(dest('public/')); // Actual public files that are used in production
    // }, 500);

    done();
})

// IMAGE task
task('image', done => {
    src(srcFile.img)
        .pipe(
            imagemin({
                // verbose: true,
            })
        ) //Minifies images
        // .pipe(rev()) //Creates the hashed image files
        .pipe(dest(public.img)) // Outputs the files in this folder
        // .pipe(rev.manifest('rev-manifest.json', { base: process.cwd() + '.', merge: true })) //Populates the rev-manifest.json file with the newly created files
        // .pipe(dest('.'));//Outputs the rev-manifest.json file in the main folder
    done();
});

// FONT task
task('font', done =>{ 
    src(srcFile.font) // Transfers all fonts from the src folder to the public folder
        .pipe(dest(public.font));
    done();
})

// COLLECT task
task('collect', done => {
    // Populates the the src/hbs & src/html and public/ asset files with the correct URLs from the rev-manifest.json 
    src(['rev-manifest.json', 'src/**/*.{hbs,html}']) // Updates the templates with the correct URLs of the hashed files
        .pipe(
            collect({
                replaceReved: true,
            })
        )
        .pipe(dest('src/')); //Templates in the src/ folder

    src(['rev-manifest.json', 'public/**/*.{json,css,js}']) //Updates the generated asset files with the hashed versions of the URLs that they contain inside of them
        .pipe(
            collect({
                replaceReved: true,
            })
        )
        .pipe(dest('public/'));// Actual public files that are used in production
    done();
});


// Purges unused CSS. In order to do it properly, copy all the CSS files you'd like to process  
// from the public/css to the src/css and then run 'gulp purgecss'. All the CSS files will be optimized
task('purgecss', done => {
    src(srcFile.css) //Minifies CSS Files
        .pipe(
            purgecss({
                content: ['src/views/**/*.hbs'], // comparing it against the files in this folder
            })
        )
        .pipe(dest(public.css));
    done();
});

// Watch task (automatically detects changes)
// Watches and executes all these task without having to "gulp default" every time
task('watch', () => {
    watch(srcFile.scss, series('scss'));
    watch(srcFile.vendorSCSS, series('vendorSCSS'));
    watch(srcFile.js, series('js'));
    watch(srcFile.vendorJS, series('vendorJS'));
    watch(srcFile.img, series('image'));
    watch(srcFile.font, series('font'));
});


exports.default = series(
    parallel('scss','vendorSCSS', 'js', 'vendorJS', 'image', 'font'),
    'watch'
);

