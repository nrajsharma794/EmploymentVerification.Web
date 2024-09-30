var fileUploader = new Vue({
    el: "#verify_emp", data:
    {
        props:
        {
            data: { "EmployeeId": "", "CompanyName": "", "VerificationCode": "" }
        },
        service: Object.assign(service),
        alertMessage: "",
        alertClass: "btn btn-success",
        msg: "Test message"
    },
    methods: {
        onSubmitBtn: function () {
            //console.log(this.props.data)
            this.resetValidationMsg();
            this.alertMessage = "Verifying...";
            var isValidated = true;
            if (this.props.data.EmployeeId.trim() == "") {
                $("#txtEmployeeId").addClass("redBColor").after("<span class='text-danger'>Please enter Employee ID</span>");
                $("#txtEmployeeId").focus();
                isValidated = false;
            }
            if (this.props.data.CompanyName.trim() == "") {
                $("#txtCompanyName").addClass("redBColor").after("<span class='text-danger'>Please enter Company Name</span>");
                if (isValidated)
                    $("#txtCompanyName").focus();
                isValidated = false;
            }
            if (this.props.data.VerificationCode.trim() == "") {
                $("#txtVerificationCode").addClass("redBColor").after("<span class='text-danger'>Please enter Verification Code</span>");
                if (isValidated)
                    $("#txtVerificationCode").focus();
                isValidated = false;
            }

            if (isValidated) {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.props.data)
                };
                fetch('/api/verify-employment', requestOptions)
                    .then(async response => {
                        // check for error response
                        var resdata = await response.json();
                        if (response.ok) {
                            this.alertMessage = resdata.message;
                            this.msg = resdata.message;
                            $("#myModal").modal('show');
                            this.alertClass = "btn btn-success";
                        }
                        else {
                            this.alertMessage = resdata.message;
                            this.msg = resdata.message;
                            $("#myModal").modal('show');
                            this.alertClass = "btn btn-danger";
                        }
                        this.alertMessage = "";
                        this.clearFields();
                    }).catch(error => {
                        this.alertMessage = "Something went wrong."
                        this.msg = "Something went wrong.";
                        this.alertClass = "btn btn-danger";
                        $("#myModal").modal('show');
                        this.alertMessage = "";
                        this.clearFields();
                    });
            }
            else
                this.alertMessage = "";
        },
        resetValidationMsg: function () {
            if ($("#txtEmployeeId").hasClass("redBColor"))
                $("#txtEmployeeId").removeClass("redBColor").next().remove();
            if ($("#txtCompanyName").hasClass("redBColor"))
                $("#txtCompanyName").removeClass("redBColor").next().remove();
            if ($("#txtVerificationCode").hasClass("redBColor"))
                $("#txtVerificationCode").removeClass("redBColor").next().remove();
        },
        clearFields: function () {
            this.props.data.EmployeeId = "";
            this.props.data.CompanyName = "";
            this.props.data.VerificationCode = "";
        },
        closeModal: function () {
            $("#myModal").modal('hide');
        }
    }, created: function () {
    }
});