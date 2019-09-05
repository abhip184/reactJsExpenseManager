import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `bearer ${token}`;

export const getTransections = id => {
  return dispatch => {
    axios
      .get("http://localhost:8080/transections/test/" + id)
      .then(result => {
        const transections = result.data.transections;
        const account = result.data.account;
        // window.M.toast({html:result.data.message ,displayLength:1000,})
        dispatch({ type: "GET_TRANSECTIONS", transections, account });
        dispatch(getBalance(id));
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("error from getTransections", error,err);
        window.M.toast({ html: error });
      });
  };
};

export const getBalance = id => {
  return dispatch => {
      
    axios
      .get("http://localhost:8080/transections/balance/" + id)
      .then(result => {
          console.log("checkEdit",id)
        const balance = result.data.balance;
        dispatch({ type: "GET_BALANCE", balance });
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("error from getBalance", error,err);
        window.M.toast({ html: error });
      });
  };
};

export const addFriend = (friendEmail, id) => {
  return dispatch => {
    const email = { friendEmail: friendEmail };
    axios
      .patch("http://localhost:8080/accounts/addFriend/" + id, email)
      .then(result => {
        window.M.toast({ html: result.data.message });
        dispatch({ type: "ADD_FRIEND", friendEmail });
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("error from addFriend", error,err);
        window.M.toast({ html: error });
      });
  };
};
export const editTransection = (id, newCategory, newAmount,accId) => {
  return dispatch => {
    axios
      .patch("http://localhost:8080/transections/" + id, [
        { propName: "category", value: newCategory },
        { propName: "amount", value: newAmount }
      ])
      .then(result => {
        window.M.toast({ html: result.data.message, displayLength: 1000 });
        const updateOps = { _id: id, amount: newAmount, category: newCategory };
        dispatch({ type: "EDIT_TRANSECTION", updateOps });
        dispatch(getBalance(accId));
      })
      .catch(err => {
        const error = err.response.data.message;
        console.log("error from editTransection", error,err);
        window.M.toast({ html: error });
      });
  };
};
export const deleteTransection = (id, accId) => {
  return dispatch => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios
          .delete("http://localhost:8080/transections/" + id)
          .then(result => {
            window.M.toast({ html: result.data.message, displayLength: 1000 });
            dispatch({ type: "DELETE_TRANSECTION", id });
            dispatch(getBalance(accId));
          })
          .catch(err => {
            const error = err.response.data.message;
            console.log("error from deleteTransection", error,err);
            window.M.toast({ html: error });
          });
      }
    });
  };
};
/**
 *
 * @param {*} id
 * @description add transection of various type
 * @todo error handling
 */
export const addTransections = id => {
  return dispatch => {
    Swal.queue([
      {
        title: "Select a transection type",
        input: "select",
        inputOptions: {
          income: "income",
          expense: "expense",
          transfer: "transfer"
        },
        inputPlaceholder: "Select a transection type",
        inputAttributes: {
          required: true
        },
        showCancelButton: true,
        confirmButtonText: "Ok",
        showLoaderOnConfirm: true,
        preConfirm: async choosenType => {
          if (choosenType === "transfer") {
            const result = await axios.get(
              "http://localhost:8080/accounts/" + id
            );
            const emailOptions = {};
            const invitesEmail = result.data.data.invites;
            if (invitesEmail.length <= 0) {
              return Swal.fire({
                type: "error",
                title: "Oops...",
                text: "You have no friends added to this account!"
              });
            }
            for (let i = 0; i < invitesEmail.length; i++) {
              emailOptions[invitesEmail[i]] = invitesEmail[i];
            }
            Swal.insertQueueStep({
              title: "Transfer To ...",
              input: "select",
              inputOptions: emailOptions,
              inputPlaceholder: "Select friend",
              showCancelButton: true,
              confirmButtonText: "Ok",
              showLoaderOnConfirm: true,
              inputAttributes: {
                required: true
              },
              preConfirm: async choosenEmail => {
                const result = await axios.get(
                  "http://localhost:8080/accounts/email/" + choosenEmail
                );
                const accountOptions = {};
                const invitesAcounts = result.data.data;
                if (invitesAcounts.length <= 0) {
                  return Swal.fire({
                    type: "error",
                    title: "Oops...",
                    text: "Your friend have no added account!"
                    //  footer: '<a href>Why do I have this issue?</a>'
                  });
                }
                for (let i = 0; i < invitesAcounts.length; i++) {
                  accountOptions[invitesAcounts[i]._id] =
                    invitesAcounts[i].accountName;
                }
                Swal.insertQueueStep({
                  title: "Which account",
                  input: "select",
                  inputOptions: accountOptions,
                  inputPlaceholder: "Select Friend Account",
                  inputAttributes: {
                    required: true
                  },
                  showCancelButton: true,
                  confirmButtonText: "Ok",
                  showLoaderOnConfirm: true,
                  preConfirm: async choosenAccount => {
                    const { value: formValues } = await Swal.fire({
                      title: "Multiple inputs",
                      html:
                        '<input id="swal-input1" class="swal2-input validate" placeholder="Enter Amount" type="number" required="true">' +
                        '<input id="swal-input2" class="swal2-input validate" placeholder="Enter discription Or Category" required="true">',
                      focusConfirm: false,
                      preConfirm: () => {
                        return [
                          document.getElementById("swal-input1").value,
                          document.getElementById("swal-input2").value
                        ];
                      }
                    });

                    if (formValues) {
                      let TransectionData = {
                        type: choosenType,
                        to: choosenEmail,
                        amount: formValues[0],
                        category: formValues[1],
                        toAccount: choosenAccount,
                        fromAccount: id
                      };
                      const result = await axios
                        .post(
                          "http://localhost:8080/transections",
                          TransectionData
                        )
                        .catch(err => {
                            const error = err.response.data.message;
                            console.log("error from addTransection", error,err);
                            window.M.toast({ html: error });
                        });
                      const newTransection = result.data.savedTransection;
                      dispatch({ type: "CREATE_TRANSECTION", newTransection });
                      dispatch(getBalance(id));
                      Swal.fire({
                        type: "success",
                        title: "Your transection has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    }
                  }
                });
              }
            });
          } else {
            return Swal.mixin({
              input: "text",
              confirmButtonText: "Next &rarr;",
              showCancelButton: true,
              progressSteps: ["1", "2"]
            })
              .queue([
                {
                  title: "Enter Amount",
                  input: "number",
                  inputAttributes: {
                    style: "margin: auto;",
                    required: true
                  }
                },
                {
                  title: "Enter Description",
                  input: "text",
                  inputAttributes: {
                    required: true
                  }
                }
              ])
              .then(result => {
                if (result.value) {
                  let TransectionData = {
                    type: choosenType,
                    amount: result.value[0],
                    category: result.value[1],
                    accountId: id
                  };
                  axios
                    .post("http://localhost:8080/transections", TransectionData)
                    .then(resultData => {
                      const newTransection = resultData.data.savedTransection;
                      Swal.fire({
                        type: "success",
                        title: "Your transection has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      dispatch({ type: "CREATE_TRANSECTION", newTransection });
                      dispatch(getBalance(id));
                    })
                    .catch(err => {
                        const error = err.response.data.message;
                        console.log("error from addTransection", error,err);
                        window.M.toast({ html: error });
                    });
                }
              });
          }
        }
      }
    ]);
  };
};
