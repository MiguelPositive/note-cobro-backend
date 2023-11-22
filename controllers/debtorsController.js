import debtorsModel from "../models/debptorsModel.js";
import nodemailer from "nodemailer";
import cron from "node-cron";

const createDebtor = async (req, res) => {
  try {
    const { name, cedula, contact, email } = req.body;

    const newDebtor = await debtorsModel({ name, cedula, contact, email });

    newDebtor.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar crear el deudor. ${error}`
    );

    res.sendStatus(500);
  }
};

const getDebtors = async (req, res) => {
  try {
    const debtors = await debtorsModel.find();

    res.send({ debtors });
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar consultar los deudores. ${error}`
    );
    res.sendStatus(500);
  }
};

const addDebt = async (req, res) => {
  try {
    const { _id, debt, products, creditDate, totalPrice } = req.body;

    console.log(totalPrice);

    await debtorsModel.updateOne(
      { _id },
      {
        $push: {
          debt: {
            creditDate: creditDate,
            products: products,
          },
        },
      }
    );

    await debtorsModel.updateOne(
      { _id },
      {
        $set: {
          totalPrice: totalPrice,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en le backend al intentar añadir la deuda al cliente: ${error}`
    );
  }
};

const sendEmail = (debtorTemp) => {
  console.log("se esta ejecutando sendEmail");
  try {
    // console.log(debtorTemp);

    let content = `
    
    <h2> Estimado/a ${debtorTemp.name},</h2> <br>
    
    Esperamos que este mensaje le encuentre bien. Nos dirigimos a usted en calidad de NoteCobro, con respecto a la deuda que aun no ha sido saldada.

    Apreciamos la confianza que ha depositado en nuestros productos/servicios y agradecemos su asociación continua. Sin embargo, observamos que la deuda mencionada aún no ha sido saldada, y deseamos recordarle amablemente la importancia de cumplir con los términos de pago acordados.
    

    <div style="display: flex; justify-content: center; align-items: center">
    <h4>Dedua actual: ${debtorTemp.totalPrice}</h4>
   </div>


   <h2 style="font-style: italic"> DETALLE DE LA DEUDA </h2> <br>

    ${debtorTemp.debt.map((d) => {
      return `
       
      <br>
      <br>
        Fecha del crédito: ${d.creditDate} 
        ${d.products.map((product) => {
          return `<br>  
        Nombre: ${product.productName} <br>
        Precio por unidad: ${product.unitPrice} <br>
        Cantidad: ${product.productsQuantity} <br>
        Subtotal: ${
          parseInt(product.unitPrice) * parseInt(product.productsQuantity)
        } <br>`;
        })}  
        `;
    })}
    `;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "miguelpruebasmail@gmail.com",
        pass: "lcck mxrm oqbo dpfv",
      },
    });

    let mailOptions = {
      from: "miguelpruebasmail@gmail.com",
      to: debtorTemp.email,
      subject: "Recordatorio de Pago Pendiente",
      html: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo enviado: " + info.response);
      }
    });
  } catch (error) {
    console.log(`ocurrio un error al intentar enviar el correo. ${error}`);
  }
};

let task;

// El mensaje se enviara el minuto asignado, en la hora asignado, el dia asignado, sin importar el mes y la hora.

const createAlert = async (req, res) => {
  try {
    const { _id, debtorTemp, payDay, payMonth, payHour, payMinute, maxAmount } =
      req.body;

    console.log(debtorTemp);

    await debtorsModel.updateOne(
      { _id },
      { $set: { payDay, payMonth, payHour, payMinute, maxAmount } }
    );

    task = cron.schedule(`${payMinute} ${payHour} ${payDay} * *`, () => {
      sendEmail(debtorTemp);
    });

    task.start();

    res.sendStatus(200);
  } catch (error) {
    console.log(
      `ocurrio un error en el backend al intentar crear la alerta: ${error}`
    );
  }
};

export { createDebtor, getDebtors, addDebt, createAlert, sendEmail };
