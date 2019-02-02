$(document).ready(function(){

    var form = $('#form_buying_product');

    form.on("submit",function(event){
        event.preventDefault();
        var nmb = form.children("input[name='number']").val();
        var product_id = $("#submit_btn").attr('data-product-id');
        var product_name = $("#submit_btn").attr('data-product-name');
        var product_price = $("#submit_btn").attr('data-product-price');

        data = {
            "product_id":product_id,
            "nmb":nmb,
            "csrfmiddlewaretoken":form.children("input[name='csrfmiddlewaretoken']").val()
        };
        var url = form.attr('action');

        console.log(data);

        $.ajax({
            url:url,
            type:"post",
            data: data,
            success:function(data){
                $("#basket-btn").children("span").html(data.products_total_nmb);
            },
            error:function(){
                alert("Ошибка");
            }
        });

        $(".basket").children('ul').append("<li>"+product_name+", "+nmb+" шт. по "+product_price+" UAH <span class='delete-item'>Удалить</span></li>")
        return false;
    });

    $("#basket-btn").on('mouseover',function(){
        if($(".basket>ul>li").length>0) $(".basket").show();
    });

    $(document).on('click',".delete-item", function(){
        $(this).parent().remove();
        if($(".basket>ul>li").length<1) $(".basket").hide();
    });
});