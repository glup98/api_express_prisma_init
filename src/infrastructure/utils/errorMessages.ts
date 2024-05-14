export class ErrorMessages {
  static missingData(): {
    message: string;
  } {
    return {
      message: 'Faltan datos necesarios para completar la operación.'
    };
  }

  static internalServerError(): { message: string } {
    return {
      message:
        'Ocurrió un error interno en el servidor. Por favor, intente nuevamente más tarde.'
    };
  }

  static uniqueConstraintViolation(): { message: string } {
    return {
      message: 'Ya existe un registro con los datos ingresados.'
    };
  }

  static notFound(): { message: string } {
    return {
      message: 'El registro solicitado no fue encontrado.'
    };
  }
  static foreignKeyConstraintViolation(): { message: string } {
    return {
      message: 'El registro a asociar no fue encontrado.'
    };
  }
}
