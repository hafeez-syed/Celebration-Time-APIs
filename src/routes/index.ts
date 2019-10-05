/**
 * Created by Hafeez Syed on 5/10/2016.
 */

function index(router) {
    router.route('/')
        .get(function (req, res) {
            res
                .status(200)
                .send('Welcome to Celebration Time');
        });

    return router;
}

export default index;
