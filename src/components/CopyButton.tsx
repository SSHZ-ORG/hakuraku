import {PureComponent} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

type CopyButtonProps = {
    content: string,
};

type CopyButtonState = {
    showCopiedTooltip: boolean,
}

export default class CopyButton extends PureComponent<CopyButtonProps, CopyButtonState> {
    constructor(props: CopyButtonProps) {
        super(props);

        this.state = {
            showCopiedTooltip: false
        };
    }

    render() {
        return <OverlayTrigger show={this.state.showCopiedTooltip} placement="bottom"
                               overlay={<Tooltip id="copied-overlay">Copied!</Tooltip>}>
            <span className="material-icons copy-button"
                  onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(this.props.content)
                          .then(() => {
                              this.setState({showCopiedTooltip: true});
                              setTimeout(() => this.setState({showCopiedTooltip: false}), 800);
                          });
                  }}>
            content_copy
        </span>
        </OverlayTrigger>;
    }
}
