const gulp = require('gulp');
//cli is command line interface when we want to interact with gulp we use it.
//there are many library for gulp
//gulp sass:converts sass to css
//css-nano compress it into one line
const sass = require('gulp-sass')
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin')
const cssnano = require('gulp-cssnano')
const del = require('del');
//gulp rev used to assign or append new string to  css file or js file
const rev = require('gulp-rev');
//task is minifing the css 

gulp.task('css',function(done){
    console.log('minifying css....')
    gulp.src('./assets/sass/**/*.scss')//** means any folder /*.scss any css file
    .pipe(sass())//all there will be passed to sass() module 
    //get converted to css
    .pipe(cssnano())//cnvetering to cssnao from gulpsass()
    //pipe is used to call gulp module
    .pipe(gulp.dest('./assets.css'))//stroing here. in assests folder only
//changing file name taking it again
    return gulp.src('./assets/**/*.css')//taking from asstes folder 
    //to create css with string
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({

            cwd:'public',//ced :curret working directory
            merge: true
    }))
    .pipe(gulp.dest('./public/assets'))//creating file.
  done();//when css dne it will passed to js
});

//manifest storing the map 
// {
//      x.xss :x-1223443.css//this stored in public when browser ask x.css the it it will mao it to this
// }

gulp.task('js', function(done){

    console.log('Creating the Js mini file');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',//ced :curret working directory
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();

})

gulp.task('image', function(done){

    console.log('Creating the image mini file');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',//ced :curret working directory will be createdin publlic as well as assets
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();

})

//Deleting the previous builds when restart is done run guld

gulp.task('clean:assets', function(done){

    del.sync('./public/assets');
    done();

});

//cretaing series of build in one task just run gulp build. this gulp cli.
//calling the task for css js and images in series and running the main task build.

gulp.task('build', gulp.series('clean:assets','css','js','image'), function(done){

    done();
})