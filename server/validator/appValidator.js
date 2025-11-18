const { body, param, validationResult } = require('express-validator');

 class appValidator {
    validateCreateTask() {
       return [
                body('selectVal')
                .notEmpty()
                .withMessage('Category is required.'),
                body('task')
                .notEmpty()
                .withMessage('Task is required.'),
                body('catId')
                .notEmpty()
                .withMessage('Category Id is required.')
                .isMongoId().withMessage('Invalid ID format.')
              ] 
    }

    validateId() {
      return [
            param('id').notEmpty().withMessage('ID is required')
            .isMongoId().withMessage('Invalid ID')
            ]
    }


    appValidationMiddleware(req, res, next){

      const errors = validationResult(req);
        console.log(errors,'errors');

      if(!errors.isEmpty()){
        let err = '';
        (errors.errors).forEach(element => {
          err+=element.msg+' ';
        });

        return res.status(400).json({ message: err });
      }
      next();
    }
}



module.exports = new appValidator();