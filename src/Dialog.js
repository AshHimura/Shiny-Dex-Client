import React from 'react'


export const Dialog = () => {

    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-5">
                    <wjInput.ListBox displayMemberPath="country" checkedMemberPath="selected" checkedItemsChanged={this.onCheckedItemChanged} itemsSource={this.state.data}>
                    </wjInput.ListBox>
                </div>
                <div className="col-xs-7">
                    <p>
                        <b>Checked Items:</b>
                    </p>
                    <ul>
                        {this.state.checkedItems.map(function (item) {
            return <li key={item.id}>
                                    {item.country}
                                </li>;
        })}
                    </ul>
                </div>
            </div>
        </div>

    )
}

