if (process.env.NODE_ENV === 'test') {
    console.log('development');
} else if (process.env.NODE_ENV === 'production') {
    console.log("production");
}
else {
    console.log(process.env.NODE_ENV);
}